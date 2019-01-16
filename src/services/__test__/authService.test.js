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

    const mockGetToken = jest.fn(() => new Promise((resolve) => { resolve(expectedToken); }));
    jest.mock('../../adapters/getToken', () => mockGetToken);
    const authenticate = require('../authService').default;
    // Act
    await authenticate(expectedEmail, expectedPassword);
    // Assert
    expect(mockGetToken).toBeCalledWith(expectedEmail, expectedPassword);
    expect(localStorage.setItem).toHaveBeenLastCalledWith(expectedKey, expectedToken);

    expect(localStorage.__STORE__[expectedKey]).toBe(expectedToken);
    expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  });
});
