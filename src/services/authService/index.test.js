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
    const expectedKey = 'authToken';

    const mockGetToken = jest.fn(() => new Promise((resolve) => {
      resolve(expectedToken);
    }));
    jest.mock('../getTokenService', () => mockGetToken);
    const authenticate = require('../authService').default;
    // Act
    await authenticate(expectedEmail, expectedPassword);
    // Assert
    expect(mockGetToken).toBeCalledWith(expectedEmail, expectedPassword);
    expect(localStorage.setItem).toHaveBeenLastCalledWith(expectedKey, expectedToken);

    expect(localStorage.__STORE__[expectedKey]).toBe(expectedToken);
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

    const mockGetToken = jest.fn(() => new Promise((resolve, reject) => {
      reject(expectedResponse);
    }));
    jest.mock('../getTokenService', () => mockGetToken);
    const authenticate = require('../authService').default;

    // Act
    const actualAuthenticatePromise = authenticate(expectedEmail, expectedPassword);

    // Assert
    await expect(actualAuthenticatePromise).rejects.toEqual(expectedResponse);
    expect(mockGetToken).toBeCalledWith(expectedEmail, expectedPassword);
    expect(localStorage.setItem).not.toHaveBeenLastCalledWith(expectedEmail, expectedPassword);
    expect(Object.keys(localStorage.__STORE__).length).toBe(0);
  });
});
