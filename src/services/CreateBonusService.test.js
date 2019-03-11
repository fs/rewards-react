describe('createBonusService', () => {
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
      headers: { Authorization: `bearer ${expectedToken}` },
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
        () => new Promise((resolve) => {
          resolve(expectedResponse);
        }),
      ),
    };
    jest.mock('axios', () => mockAxios);
    const createBonus = require('./CreateBonusService').default;

    // Act
    const actualResponse = await createBonus(expectedToken, expectedBonusText);

    // Assert
    expect(actualResponse).toEqual(expectedResponse);
    expect(mockAxios.post).toBeCalledWith(expectedPath, expectedParams, config);
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
      headers: { Authorization: `bearer ${expectedToken}` },
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

    const mockAxios = {
      post: jest.fn(
        () => new Promise((resolve, reject) => {
          reject(expectedError);
        }),
      ),
    };
    jest.mock('axios', () => mockAxios);
    const createBonus = require('./CreateBonusService').default;

    let actualError;
    try {
      // Act
      await createBonus(expectedToken, expectedBonusText);
    } catch (error) {
      actualError = error;
    }

    // Assert
    expect(actualError).toEqual(expectedError);
    expect(mockAxios.post).toBeCalledWith(expectedPath, expectedParams, config);
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
      headers: { Authorization: `bearer ${expectedToken}` },
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

    const mockAxios = {
      post: jest.fn(
        () => new Promise((resolve, reject) => {
          reject(expectedError);
        }),
      ),
    };
    jest.mock('axios', () => mockAxios);
    const createBonus = require('./CreateBonusService').default;

    let actualError;
    try {
      // Act
      await createBonus(expectedToken, expectedBonusText);
    } catch (error) {
      actualError = error;
    }

    // Assert
    expect(actualError).toEqual(expectedError);
    expect(mockAxios.post).toBeCalledWith(expectedPath, expectedParams, config);
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
      headers: { Authorization: `bearer ${expectedToken}` },
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

    const mockAxios = {
      post: jest.fn(
        () => new Promise((resolve, reject) => {
          reject(expectedError);
        }),
      ),
    };
    jest.mock('axios', () => mockAxios);
    const createBonus = require('./CreateBonusService').default;

    let actualError;
    try {
      // Act
      await createBonus(expectedToken, expectedBonusText);
    } catch (error) {
      actualError = error;
    }

    // Assert
    expect(actualError).toEqual(expectedError);
    expect(mockAxios.post).toBeCalledWith(expectedPath, expectedParams, config);
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
      headers: { Authorization: `bearer ${expectedToken}` },
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

    const mockAxios = {
      post: jest.fn(
        () => new Promise((resolve, reject) => {
          reject(expectedError);
        }),
      ),
    };
    jest.mock('axios', () => mockAxios);
    const createBonus = require('./CreateBonusService').default;

    let actualError;
    try {
      // Act
      await createBonus(expectedToken, expectedBonusText);
    } catch (error) {
      actualError = error;
    }

    // Assert
    expect(actualError).toEqual(expectedError);
    expect(mockAxios.post).toBeCalledWith(expectedPath, expectedParams, config);
  });
});
