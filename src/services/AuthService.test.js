import AuthService from './AuthService';
import api from './ApiService';
import BonusPossibilitiesService from './BonusPossibilitiesService';

jest.mock('./ApiService');
jest.mock('./BonusPossibilitiesService');

describe('authService', () => {
  beforeEach(() => {
    jest.resetModules();
    localStorage.clear();
    localStorage.setItem.mockClear();
  });

  test('authenticate NewUser', async () => {
    // Arrange
    const expectedEmail = 'leyla.khamidullina@flatstack.com';
    const expectedPassword = '123456';
    const expectedToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDY5MzYwODEsInN1YiI6MTg5fQ.WmEzvkjo1UpHRfWzr5Vv_hbBIJtYiT5_0bsPD0DAXEQ';
    const expectedResponse = {
      data: {
        data: {
          attributes: {
            token: expectedToken,
          },
        },
      },
    };

    const expectedPath = '/user/tokens';
    const expectedParams = {
      data: {
        type: 'user-token-requests',
        attributes: {
          email: expectedEmail,
          password: expectedPassword,
        },
      },
    };

    const mockApiServicePost = jest.fn(
      () =>
        new Promise(resolve => {
          resolve(expectedResponse);
        }),
    );

    api.post.mockImplementation(mockApiServicePost);
    const mockFetchToken = jest.spyOn(AuthService, 'fetchToken');

    const mockSavePossibilities = jest.fn();
    BonusPossibilitiesService.savePossibilities.mockImplementation(mockSavePossibilities);

    // Act
    await AuthService.authenticate(expectedEmail, expectedPassword);
    // Assert
    expect(api.post).toHaveBeenCalledWith(expectedPath, expectedParams);
    expect(localStorage.setItem).toHaveBeenLastCalledWith(AuthService.TOKEN_KEY, expectedToken);
    expect(mockFetchToken).toHaveBeenCalledWith(expectedEmail, expectedPassword);
    expect(BonusPossibilitiesService.savePossibilities).toHaveBeenCalledWith(expectedToken);

    expect(localStorage.__STORE__[AuthService.TOKEN_KEY]).toBe(expectedToken);
    expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  });

  test('authenticate Wrong credentials', async () => {
    // Arrange
    const expectedEmail = 'your.mom@mail.ru';
    const expectedPassword = 'daddy1900';
    const expectedResponse = {
      errors: [
        {
          source: {
            pointer: '/data/attributes/base',
          },
          detail: 'Invalid credentials.',
        },
      ],
    };

    const expectedPath = '/user/tokens';
    const expectedParams = {
      data: {
        type: 'user-token-requests',
        attributes: {
          email: expectedEmail,
          password: expectedPassword,
        },
      },
    };

    const mockApiServicePost = jest.fn(
      () =>
        new Promise((resolve, reject) => {
          reject(expectedResponse);
        }),
    );

    api.post.mockImplementation(mockApiServicePost);

    const mockFetchToken = jest.spyOn(AuthService, 'fetchToken');

    // Act
    const actualAuthenticatePromise = AuthService.authenticate(expectedEmail, expectedPassword);

    // Assert
    await expect(actualAuthenticatePromise).rejects.toEqual(expectedResponse);
    expect(mockFetchToken).toHaveBeenCalledWith(expectedEmail, expectedPassword);
    expect(api.post).toHaveBeenCalledWith(expectedPath, expectedParams);
    expect(localStorage.setItem).not.toHaveBeenLastCalledWith(expectedEmail, expectedPassword);
    expect(Object.keys(localStorage.__STORE__).length).toBe(0);
  });

  test('fetchToken HappyPath', async () => {
    // Arrange
    const expectedEmail = 'leyla.khamidullina@flatstack.com';
    const expectedPassword = '123456';
    const expectedToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTc4MTc2MDksInN1YiI6MzksInR5cGUiOiJhY2Nlc3MifQ.TvRjHkOh7oy7i9LFzI5kA2eN1vyGFAJaR6tJ2Qyf3qI';
    const expectedResponse = {
      data: {
        data: {
          id: expectedToken,
          type: 'paired-jwt-tokens',
          attributes: {
            token: expectedToken,
            refresh:
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NjI5MTUyMDksInN1YiI6MzksInR5cGUiOiJyZWZyZXNoIiwiY2xpZW50X2lkIjpudWxsfQ.XWh8Af0KRZtJMkgG376laK6XdnIIxKX7lS4SL_be-DE',
          },
        },
      },
    };
    const expectedPath = '/user/tokens';
    const expectedParams = {
      data: {
        type: 'user-token-requests',
        attributes: {
          email: expectedEmail,
          password: expectedPassword,
        },
      },
    };
    const mockApiServicePost = jest.fn(
      () =>
        new Promise(resolve => {
          resolve(expectedResponse);
        }),
    );

    api.post.mockImplementation(mockApiServicePost);
    // Act
    const actualToken = await AuthService.fetchToken(expectedEmail, expectedPassword);
    // Assert
    expect(actualToken).toEqual(expectedToken);
    expect(api.post).toHaveBeenCalledWith(expectedPath, expectedParams);
  });

  test('fetchToken WrongEmail', async () => {
    // Arrange
    const expectedEmail = 'leyla.khamidullina1@flatstack.com';
    const expectedPassword = '123456';
    const expectedResponseStatus = 422;
    const expectedResponseData = {
      errors: [
        {
          source: {
            pointer: '/data/attributes/base',
          },
          detail: 'Invalid credentials.',
        },
      ],
    };
    const expectedPath = '/user/tokens';
    const expectedParams = {
      data: {
        type: 'user-token-requests',
        attributes: {
          email: expectedEmail,
          password: expectedPassword,
        },
      },
    };
    const expectedError = new Error();
    expectedError.response = {
      status: expectedResponseStatus,
      data: expectedResponseData,
    };
    const mockApiServicePost = jest.fn(
      () =>
        new Promise((resolve, reject) => {
          reject(expectedError);
        }),
    );

    api.post.mockImplementation(mockApiServicePost);

    let actualError;
    try {
      // Act
      await AuthService.fetchToken(expectedEmail, expectedPassword);
    } catch (error) {
      actualError = error;
    }
    // Assert
    expect(api.post).toHaveBeenCalledWith(expectedPath, expectedParams);
    expect(actualError).toEqual(expectedError);
  });

  test('getToken HappyPath', async () => {
    // Arrange
    const expectedToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDY5MzYwODEsInN1YiI6MTg5fQ.WmEzvkjo1UpHRfWzr5Vv_hbBIJtYiT5_0bsPD0DAXEQ';
    localStorage.setItem(AuthService.TOKEN_KEY, expectedToken);
    // Act
    const actualToken = AuthService.getToken();
    // Assert
    expect(localStorage.getItem).toHaveBeenLastCalledWith(AuthService.TOKEN_KEY);
    expect(actualToken).toEqual(expectedToken);
  });
});
