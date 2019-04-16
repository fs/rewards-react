import BonusService from './BonusService';
import api from './ApiService';

jest.mock('./ApiService');


describe('BonusService', () => {
  const expectedPath = '/user/bonuses';

  beforeEach(() => {
    jest.resetModules();
  });

  test('createBonus HappyPath', async () => {
    // Arrange
    const expectedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTA3MzcwNjIsInN1YiI6MzczLCJ0eXBlIjoiYWNjZXNzIn0.JyTOZ8boBYlq0U3Iz3oVs7Tf-eeBLmD_Kl9ml2TO4YA';

    const expectedBonusCount = '+1';
    const expectedReceiver = '@albert.fazullin';
    const expectedTag = '#create-awesomeness';
    const expectedBonusText = `${expectedBonusCount} ${expectedReceiver} ${expectedTag}`;

    const expectedParams = {
      data: {
        type: 'bonus-texts',
        attributes: {
          text: expectedBonusText,
        },
      },
    };
    const config = {
      headers: { Authorization: `Bearer ${expectedToken}` },
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

    const mockApiServicePost = jest.fn(
      () => new Promise((resolve) => {
        resolve(expectedResponse);
      }),
    );


    api.post.mockImplementation(mockApiServicePost);

    // Act
    const actualResponse = await BonusService.createBonus(expectedToken, expectedBonusText);

    // Assert
    expect(actualResponse).toEqual(expectedResponse);
    expect(api.post).toBeCalledWith(expectedPath, expectedParams, config);
  });

  test('createBonus InvalidToken', async () => {
    // Arrange
    const expectedToken = '';

    const expectedBonusCount = '+1';
    const expectedReceiver = '@albert.fazullin';
    const expectedTag = '#create-awesomeness';
    const expectedBonusText = `${expectedBonusCount} ${expectedReceiver} ${expectedTag}`;

    const expectedParams = {
      data: {
        type: 'bonus-texts',
        attributes: {
          text: expectedBonusText,
        },
      },
    };
    const config = {
      headers: { Authorization: `Bearer ${expectedToken}` },
    };

    const expectedError = new Error();
    expectedError.response = {
      errors: [
        {
          id: 'b8d32efe-d911-4490-a429-c9d6bda21253',
          title: 'Unauthorized',
        },
      ],
    };


    const mockApiServicePost = jest.fn(
      () => new Promise((resolve, reject) => {
        reject(expectedError);
      }),
    );

    api.post.mockImplementation(mockApiServicePost);

    let actualError;
    try {
      // Act
      await BonusService.createBonus(expectedToken, expectedBonusText);
    } catch (error) {
      actualError = error;
    }

    // Assert
    expect(actualError).toEqual(expectedError);
    expect(api.post).toBeCalledWith(expectedPath, expectedParams, config);
  });

  test('createBonus NotEnoughBonuses', async () => {
    // Arrange
    const expectedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTA3MzcwNjIsInN1YiI6MzczLCJ0eXBlIjoiYWNjZXNzIn0.JyTOZ8boBYlq0U3Iz3oVs7Tf-eeBLmD_Kl9ml2TO4YA';

    const expectedBonusCount = '+1000000';
    const expectedReceiver = '@albert.fazullin';
    const expectedTag = '#create-awesomeness';
    const expectedBonusText = `${expectedBonusCount} ${expectedReceiver} ${expectedTag}`;

    const expectedParams = {
      data: {
        type: 'bonus-texts',
        attributes: {
          text: expectedBonusText,
        },
      },
    };
    const config = {
      headers: { Authorization: `Bearer ${expectedToken}` },
    };

    const expectedError = new Error();
    expectedError.response = {
      errors: [
        {
          source: {
            pointer: '/data/attributes/base',
          },
          detail: "You can't give more points than 500.",
        },
      ],
    };

    const mockApiServicePost = jest.fn(
      () => new Promise((resolve, reject) => {
        reject(expectedError);
      }),
    );

    api.post.mockImplementation(mockApiServicePost);

    let actualError;
    try {
      // Act
      await BonusService.createBonus(expectedToken, expectedBonusText);
    } catch (error) {
      actualError = error;
    }

    // Assert
    expect(actualError).toEqual(expectedError);
    expect(api.post).toBeCalledWith(expectedPath, expectedParams, config);
  });

  test('createBonus InvalidBonusText', async () => {
    // Arrange
    const expectedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTA3MzcwNjIsInN1YiI6MzczLCJ0eXBlIjoiYWNjZXNzIn0.JyTOZ8boBYlq0U3Iz3oVs7Tf-eeBLmD_Kl9ml2TO4YA';

    const expectedBonusCount = '';
    const expectedReceiver = '';
    const expectedTag = '';
    const expectedBonusText = `${expectedBonusCount} ${expectedReceiver} ${expectedTag}`;

    const expectedParams = {
      data: {
        type: 'bonus-texts',
        attributes: {
          text: expectedBonusText,
        },
      },
    };
    const config = {
      headers: { Authorization: `Bearer ${expectedToken}` },
    };

    const expectedError = new Error();
    expectedError.response = {
      errors: [
        {
          source: {
            pointer: '/data/attributes/receivers',
          },
          detail: "can't be blank",
        },
        {
          source: {
            pointer: '/data/attributes/points',
          },
          detail: "can't be blank",
        },
        {
          source: {
            pointer: '/data/attributes/points',
          },
          detail: 'is not a number',
        },
        {
          source: {
            pointer: '/data/attributes/tags',
          },
          detail: "can't be blank",
        },
      ],
    };

    const mockApiServicePost = jest.fn(
      () => new Promise((resolve, reject) => {
        reject(expectedError);
      }),
    );

    api.post.mockImplementation(mockApiServicePost);


    let actualError;
    try {
      // Act
      await BonusService.createBonus(expectedToken, expectedBonusText);
    } catch (error) {
      actualError = error;
    }

    // Assert
    expect(actualError).toEqual(expectedError);
    expect(api.post).toBeCalledWith(expectedPath, expectedParams, config);
  });

  test('createBonus SendBonusToYourself', async () => {
    // Arrange
    const expectedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTA3MzcwNjIsInN1YiI6MzczLCJ0eXBlIjoiYWNjZXNzIn0.JyTOZ8boBYlq0U3Iz3oVs7Tf-eeBLmD_Kl9ml2TO4YA';

    const expectedBonusCount = '+1';
    const expectedMyEmail = 'nadezhda.kharchuk@flatstack.com';
    const expectedTag = '#create-awesomeness';
    const expectedBonusText = `${expectedBonusCount} ${expectedMyEmail} ${expectedTag}`;

    const expectedParams = {
      data: {
        type: 'bonus-texts',
        attributes: {
          text: expectedBonusText,
        },
      },
    };
    const config = {
      headers: { Authorization: `Bearer ${expectedToken}` },
    };

    const expectedError = new Error();
    expectedError.response = {
      errors: [
        {
          source: {
            pointer: '/data/attributes/base',
          },
          detail: "You can't give bonus to yourself. Nice try.",
        },
      ],
    };

    const mockApiServicePost = jest.fn(
      () => new Promise((resolve, reject) => {
        reject(expectedError);
      }),
    );

    api.post.mockImplementation(mockApiServicePost);


    let actualError;
    try {
      // Act
      await BonusService.createBonus(expectedToken, expectedBonusText);
    } catch (error) {
      actualError = error;
    }

    // Assert
    expect(actualError).toEqual(expectedError);
    expect(api.post).toBeCalledWith(expectedPath, expectedParams, config);
  });

  test('update BonusesList HappyPath', async () => {
    // Arrange
    const expectedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTA3MzcwNjIsInN1YiI6MzczLCJ0eXBlIjoiYWNjZXNzIn0.JyTOZ8boBYlq0U3Iz3oVs7Tf-eeBLmD_Kl9ml2TO4YA';

    const config = {
      headers: { Authorization: `Bearer ${expectedToken}` },
    };

    const expectedResponse = {
      data: [
        {
          id: '245',
          type: 'bonuses',
          attributes: {
            text: '+1 somekek @nadezhda.kharchuk #kek-pek-cheburek #win-win-win',
            points: 1,
            'total-points': 1,
            'created-at': '2019-03-14T09:25:12.701Z',
          },
          relationships: {
            sender: {
              data: {
                id: '51',
                type: 'users',
              },
            },
            comments: {
              data: [],
            },
          },
        },
        {
          id: '244',
          type: 'bonuses',
          attributes: {
            text: ' +1 to @leyla.khamidullina #create-awesomeness Thank you!',
            points: 1,
            'total-points': 1,
            'created-at': '2019-03-14T08:55:33.222Z',
          },
          relationships: {
            sender: {
              data: {
                id: '39',
                type: 'users',
              },
            },
            comments: {
              data: [],
            },
          },
        },
        {
          id: '243',
          type: 'bonuses',
          attributes: {
            text: ' +1 to @leyla.khamidullina #create-awesomeness Thank you!',
            points: 1,
            'total-points': 1,
            'created-at': '2019-03-14T08:51:02.084Z',
          },
          relationships: {
            sender: {
              data: {
                id: '39',
                type: 'users',
              },
            },
            comments: {
              data: [],
            },
          },
        },
        {
          id: '242',
          type: 'bonuses',
          attributes: {
            text: '+2 @timur.vafin #win-win-win',
            points: 2,
            'total-points': 2,
            'created-at': '2019-03-14T08:43:25.173Z',
          },
          relationships: {
            sender: {
              data: {
                id: '39',
                type: 'users',
              },
            },
            comments: {
              data: [
                {
                  id: '346',
                  type: 'comments',
                },
              ],
            },
          },
        },
        {
          id: '241',
          type: 'bonuses',
          attributes: {
            text: '+2 @timur.vafin #win-win-win',
            points: 2,
            'total-points': 2,
            'created-at': '2019-03-14T08:43:07.490Z',
          },
          relationships: {
            sender: {
              data: {
                id: '39',
                type: 'users',
              },
            },
            comments: {
              data: [],
            },
          },
        },
        {
          id: '240',
          type: 'bonuses',
          attributes: {
            text: ' +1 to @leyla.khamidullina #create-awesomeness Thank you!',
            points: 1,
            'total-points': 1,
            'created-at': '2019-03-14T08:30:00.729Z',
          },
          relationships: {
            sender: {
              data: {
                id: '39',
                type: 'users',
              },
            },
            comments: {
              data: [],
            },
          },
        },
        {
          id: '239',
          type: 'bonuses',
          attributes: {
            text: ' +1 to @leyla.khamidullina #create-awesomeness Thank you!',
            points: 1,
            'total-points': 1,
            'created-at': '2019-03-11T08:50:47.661Z',
          },
          relationships: {
            sender: {
              data: {
                id: '39',
                type: 'users',
              },
            },
            comments: {
              data: [],
            },
          },
        },
        {
          id: '238',
          type: 'bonuses',
          attributes: {
            text: ' +1 to @timur.vafin #create-awesomeness Thank you!',
            points: 1,
            'total-points': 1,
            'created-at': '2019-02-25T10:32:33.555Z',
          },
          relationships: {
            sender: {
              data: {
                id: '39',
                type: 'users',
              },
            },
            comments: {
              data: [],
            },
          },
        },
        {
          id: '237',
          type: 'bonuses',
          attributes: {
            text: '+2 to @albert.fazullin #create-awesomeness Thank you!',
            points: 2,
            'total-points': 2,
            'created-at': '2019-02-25T08:41:21.184Z',
          },
          relationships: {
            sender: {
              data: {
                id: '39',
                type: 'users',
              },
            },
            comments: {
              data: [],
            },
          },
        },
        {
          id: '236',
          type: 'bonuses',
          attributes: {
            text: '+1 to @albert.fazullin #create-awesomeness Thank you!',
            points: 1,
            'total-points': 1,
            'created-at': '2019-02-20T13:05:46.591Z',
          },
          relationships: {
            sender: {
              data: {
                id: '39',
                type: 'users',
              },
            },
            comments: {
              data: [],
            },
          },
        },
      ],
      included: [
        {
          id: '51',
          type: 'users',
          attributes: {
            email: 'albert.fazullin@flatstack.com',
            'full-name': 'Albert Fazullin',
            username: 'albert.fazullin',
            'profile-image-avatar-url': 'default-user-profile_image.svg',
            'bonus-balance': 4,
            'allowance-balance': 499,
          },
        },
        {
          id: '39',
          type: 'users',
          attributes: {
            'full-name': 'Nadezhda Kharchuk',
          },
        },
        {
          id: '346',
          type: 'comments',
          attributes: {
            'created-at': '2019-03-14T09:02:49.045Z',
            text: 'test comment\r\n',
          },
          relationships: {
            bonus: {
              data: {
                id: '242',
                type: 'bonuses',
              },
            },
            sender: {
              data: {
                id: '39',
                type: 'users',
              },
            },
          },
        },
      ],
      links: {
        self: 'http://rewards-staging.flatstack.com/api/v1/user/bonuses?page%5Bnumber%5D=1&page%5Bsize%5D=10',
        first: 'http://rewards-staging.flatstack.com/api/v1/user/bonuses?page%5Bnumber%5D=1&page%5Bsize%5D=10',
        prev: null,
        next: 'http://rewards-staging.flatstack.com/api/v1/user/bonuses?page%5Bnumber%5D=2&page%5Bsize%5D=10',
        last: 'http://rewards-staging.flatstack.com/api/v1/user/bonuses?page%5Bnumber%5D=19&page%5Bsize%5D=10',
      },
    };

    const mockApiServiceGet = jest.fn(
      () => new Promise((resolve) => {
        resolve(expectedResponse);
      }),
    );

    api.get.mockImplementation(mockApiServiceGet);

    // Act
    const actualResponse = await BonusService.fetchBonusesList(expectedToken);

    // Assert
    expect(actualResponse).toEqual(expectedResponse);
    expect(api.get).toBeCalledWith(expectedPath, config);
  });

  test('update BonusesList invalid credentials', async () => {
    // Arrange
    const expectedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTA3MzcwNjIsInN1YiI6MzczLCJ0eXBlIjoiYWNjZXNzIn0.JyTOZ8boBYlq0U3Iz3oVs7Tf-eeBLmD_Kl9ml2TO4YA';

    const config = {
      headers: { Authorization: `Bearer ${expectedToken}` },
    };

    const expectedError = new Error();
    expectedError.response = {
      errors: [
        {
          id: '5da620e8-d80e-4c74-a698-1624efa46ab2',
          title: 'Unauthorized',
        },
      ],
    };

    const mockApiServiceGet = jest.fn(
      () => new Promise((resolve, reject) => {
        reject(expectedError);
      }),
    );


    api.get.mockImplementation(mockApiServiceGet);

    // Act
    let actualError;
    try {
      // Act
      await BonusService.fetchBonusesList(expectedToken);
    } catch (error) {
      actualError = error;
    }

    // Assert
    expect(actualError).toEqual(expectedError);
    expect(api.get).toBeCalledWith(expectedPath, config);
  });
});
