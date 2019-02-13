describe('user profile service', () => {
  test('get user profile', async () => {
    // Arrange
    const expectedToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDY5MzYwODEsInN1YiI6MTg5fQ.WmEzvkjo1UpHRfWzr5Vv_hbBIJtYiT5_0bsPD0DAXEQ';

    const mockAxios = {
      get: jest.fn(
        () =>
          new Promise(resolve => {
            resolve(expectedResponse);
          })
      )
    };
    jest.mock('axios', () => mockAxios);
    const getUserProfile = require('./index').default;
    const expectedPath = 'https://rewards.flatstack.com/api/v1/user/profile';
    const expectedParams = {
      data: {
        type: 'user-token-requests',
        attributes: {
          email: expectedEmail,
          password: expectedPassword
        }
      }
    };
    // Act
    const actualProfile = await getUserProfile(expectedToken);
    // Assert
    expect(actualProfile).toEqual(expectedProfile);
    expect(mockAxios.get).toBeCalledWith(expectedPath, expectedParams);
  });
});
