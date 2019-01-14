describe('authService', () => {
  beforeEach(() => {
    jest.resetModules();

    localStorage.clear();
    localStorage.__STORE__ = {};
    jest.resetAllMocks();
    //localStorage.setItem.mockClear();
  });

  test('getToken HappyPath', async () => {
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
    const expectedPath = 'https://rewards.flatstack.com/api/v1/user/tokens';
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
      post: jest.fn(() => new Promise((resolve) => {
        resolve(expectedResponse);
      })),
    };
    jest.mock('axios', () => mockAxios);
    const { getToken } = require('../authService');
    // Act
    const actualToken = await getToken(expectedEmail, expectedPassword);
    // Assert
    expect(actualToken).toEqual(expectedToken);
    expect(mockAxios.post).toBeCalledWith(expectedPath, expectedParams);
  });

  test('getToken WrongEmail', async () => {
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
    const expectedPath = 'https://rewards.flatstack.com/api/v1/user/tokens';
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
      post: jest.fn(() => new Promise((resolve, reject) => {
        reject(expectedError);
      })),
    };
    jest.mock('axios', () => mockAxios);
    const { getToken } = require('../authService');
    let actualError;
    try {
      // Act
      await getToken(expectedEmail, expectedPassword);
    } catch (error) {
      actualError = error;
    }
    // Assert
    expect(mockAxios.post).toBeCalledWith(expectedPath, expectedParams);
    expect(actualError).toEqual(expectedError);
  });

  test('authenticate NewUser', () => {
    // Arrange
    const expectedEmail = 'leyla.khamidullina@flatstack.com';
    const expectedPassword = '123456';
    const expectedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDY5MzYwODEsInN1YiI6MTg5fQ.WmEzvkjo1UpHRfWzr5Vv_hbBIJtYiT5_0bsPD0DAXEQ';
    const expectedKey = 'authToken';
    const mockGetToken = jest.fn();
    const authService = require('../authService');
    authService.getToken = mockGetToken;
    // Act
    authService.authenticate(expectedEmail, expectedPassword);
    // Assert
    expect(authService.getToken).toBeCalledWith(expectedEmail, expectedPassword);
    expect(localStorage.setItem).toHaveBeenLastCalledWith(expectedKey, expectedToken);
    expect(localStorage.__STORE__[expectedKey]).toBe(expectedToken);
    expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  });
});
