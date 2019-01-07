describe('getToken', () => {
  test('getToken HappyPath', async () => {
    // Arrange
    const getToken = require('../getToken');
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
    // Act
    const actualToken = await getToken(expectedEmail, expectedPassword);
    // Assert
    expect(actualToken).toEqual(expectedToken);
    expect(mockAxios.post).toBeCalledWith(expectedPath, expectedParams);
  });
});
