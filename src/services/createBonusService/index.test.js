describe('createBonusService', () => {
  test('createBonus HappyPath', async () => {
    // Arrange
    const expectedToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTA3MzcwNjIsInN1YiI6MzczLCJ0eXBlIjoiYWNjZXNzIn0.JyTOZ8boBYlq0U3Iz3oVs7Tf-eeBLmD_Kl9ml2TO4YA';
    const expectedBonusText = '+1 to @albert.fazullin #create-awesomeness Thank you!';
    const expectedPath = 'http://rewards-staging.flatstack.com/api/v1/user/bonuses';
    const expectedParams = {
      data: {
        type: 'bonus-texts',
        attributes: {
          text: expectedBonusText,
        },
      },
    };
    const config = {
      headers: { Authorization: 'bearer ' + expectedToken },
    };

    const expectedResponse = {
      data: {
        id: '4492',
        type: 'bonuses',
        attributes: {
          text: expectedBonusText,
          points: 1,
          'total-points': 1,
          'created-at': '2019-02-20T08:41:03.710Z',
        },
        relationships: {
          sender: {
            data: {
              id: '373',
              type: 'users',
            },
          },
          comments: {
            data: [],
          },
        },
      },
    };

    const mockAxios = {
      post: jest.fn(
        () =>
          new Promise(resolve => {
            resolve(expectedResponse);
          }),
      ),
    };
    jest.mock('axios', () => mockAxios);
    const createBonus = require('./index').default;
    // Act
    const actualResponse = await createBonus(expectedToken, expectedBonusText);
    // Assert
    expect(actualResponse).toEqual(expectedResponse);
    expect(mockAxios.post).toBeCalledWith(expectedPath, expectedParams, config);
  });
});
