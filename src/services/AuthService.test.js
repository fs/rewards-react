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
    const expectedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDY5MzYwODEsInN1YiI6MTg5fQ.WmEzvkjo1UpHRfWzr5Vv_hbBIJtYiT5_0bsPD0DAXEQ';

    const mockFetchToken = jest.fn(() => new Promise((resolve) => {
      resolve(expectedToken);
    }));
    const AuthService = require('./AuthService').default;
    AuthService.fetchToken = mockFetchToken;
    // Act
    await AuthService.authenticate(expectedEmail, expectedPassword);
    // Assert
    expect(mockFetchToken).toBeCalledWith(expectedEmail, expectedPassword);
    expect(localStorage.setItem).toHaveBeenLastCalledWith(AuthService.TOKEN_KEY, expectedToken);

    expect(localStorage.__STORE__[AuthService.TOKEN_KEY]).toBe(expectedToken);
    expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  });

  test('authenticate Wrong credentials', async () => {
    // Arrange
    const expectedEmail = 'your.mom@mail.ru';
    const expectedPassword = 'daddy1900';
    const expectedResponse = {
      errors: [{
        source: {
          pointer: '/data/attributes/base',
        },
        detail: 'Invalid credentials.',
      }],
    };

    const mockFetchToken = jest.fn(() => new Promise((resolve, reject) => {
      reject(expectedResponse);
    }));
    const AuthService = require('./AuthService').default;
    AuthService.fetchToken = mockFetchToken;

    // Act
    const actualAuthenticatePromise = AuthService.authenticate(expectedEmail, expectedPassword);

    // Assert
    await expect(actualAuthenticatePromise).rejects.toEqual(expectedResponse);
    expect(mockFetchToken).toBeCalledWith(expectedEmail, expectedPassword);
    expect(localStorage.setItem).not.toHaveBeenLastCalledWith(expectedEmail, expectedPassword);
    expect(Object.keys(localStorage.__STORE__).length).toBe(0);
  });

  test('fetchToken HappyPath', async () => {
    // Arrange
    const expectedEmail = 'leyla.khamidullina@flatstack.com';
    const expectedPassword = '123456';
    const expectedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDY5MzYwODEsInN1YiI6MTg5fQ.WmEzvkjo1UpHRfWzr5Vv_hbBIJtYiT5_0bsPD0DAXEQ';
    const expectedResponse = {
      data: {
        data: {
          id: expectedToken,
          type: 'jwt-tokens',
          attributes: {
            token: expectedToken,
          },
        },
      },
    };
    const expectedPath = 'http://rewards-staging.flatstack.com/api/v1/user/tokens';
    const expectedParams = {
      data: {
        type: 'user-token-requests',
        attributes: {
          email: expectedEmail,
          password: expectedPassword,
        },
      },
    };
    const mockAxios = {
      post: jest.fn(
        () => new Promise((resolve) => {
          resolve(expectedResponse);
        }),
      ),
    };
    jest.mock('axios', () => mockAxios);
    const AuthService = require('./AuthService').default;
    // Act
    const actualToken = await AuthService.fetchToken(expectedEmail, expectedPassword);
    // Assert
    expect(actualToken).toEqual(expectedToken);
    expect(mockAxios.post).toBeCalledWith(expectedPath, expectedParams);
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
    const expectedPath = 'http://rewards-staging.flatstack.com/api/v1/user/tokens';
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
    const mockAxios = {
      post: jest.fn(
        () => new Promise((resolve, reject) => {
          reject(expectedError);
        }),
      ),
    };
    jest.mock('axios', () => mockAxios);
    const AuthService = require('./AuthService').default;
    let actualError;
    try {
      // Act
      await AuthService.fetchToken(expectedEmail, expectedPassword);
    } catch (error) {
      actualError = error;
    }
    // Assert
    expect(mockAxios.post).toBeCalledWith(expectedPath, expectedParams);
    expect(actualError).toEqual(expectedError);
  });

  test('getToken HappyPath', async () => {
    // Arrange
    const expectedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDY5MzYwODEsInN1YiI6MTg5fQ.WmEzvkjo1UpHRfWzr5Vv_hbBIJtYiT5_0bsPD0DAXEQ';
    const AuthService = require('./AuthService').default;
    localStorage.setItem(AuthService.TOKEN_KEY, expectedToken);
    // Act
    const actualToken = AuthService.getToken();
    // Assert
    expect(localStorage.getItem).toHaveBeenLastCalledWith(AuthService.TOKEN_KEY);
    expect(actualToken).toEqual(expectedToken);
  });
});
