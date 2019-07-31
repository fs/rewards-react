import BonusService from './BonusService';
import api from './ApiService';
import AuthService from './AuthService';
import bonusResponse from '../mock_data/bonusResponse';

jest.mock('./ApiService');
jest.mock('./AuthService');

describe('BonusService', () => {
  const expectedPath = '/user/bonuses';

  beforeEach(() => {
    jest.resetModules();
  });

  test('createBonus HappyPath', async () => {
    // Arrange
    const expectedToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTA3MzcwNjIsInN1YiI6MzczLCJ0eXBlIjoiYWNjZXNzIn0.JyTOZ8boBYlq0U3Iz3oVs7Tf-eeBLmD_Kl9ml2TO4YA';

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

    const mockGetToken = jest.fn(() => expectedToken);
    AuthService.getToken.mockImplementation(mockGetToken);

    const mockApiServicePost = jest.fn(
      () =>
        new Promise(resolve => {
          resolve(expectedResponse);
        }),
    );
    api.post.mockImplementation(mockApiServicePost);

    // Act
    const actualResponse = await BonusService.createBonus(expectedBonusText);

    // Assert
    expect(actualResponse).toEqual(expectedResponse);
    expect(AuthService.getToken).toHaveBeenCalled();
    expect(api.post).toHaveBeenCalledWith(expectedPath, expectedParams, config);
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

    const mockGetToken = jest.fn(() => expectedToken);
    AuthService.getToken.mockImplementation(mockGetToken);

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
      await BonusService.createBonus(expectedBonusText);
    } catch (error) {
      actualError = error;
    }

    // Assert
    expect(actualError).toEqual(expectedError);
    expect(AuthService.getToken).toHaveBeenCalled();
    expect(api.post).toHaveBeenCalledWith(expectedPath, expectedParams, config);
  });

  test('createBonus NotEnoughBonuses', async () => {
    // Arrange
    const expectedToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTA3MzcwNjIsInN1YiI6MzczLCJ0eXBlIjoiYWNjZXNzIn0.JyTOZ8boBYlq0U3Iz3oVs7Tf-eeBLmD_Kl9ml2TO4YA';

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

    const mockGetToken = jest.fn(() => expectedToken);
    AuthService.getToken.mockImplementation(mockGetToken);

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
      await BonusService.createBonus(expectedBonusText);
    } catch (error) {
      actualError = error;
    }

    // Assert
    expect(actualError).toEqual(expectedError);
    expect(AuthService.getToken).toHaveBeenCalled();
    expect(api.post).toHaveBeenCalledWith(expectedPath, expectedParams, config);
  });

  test('createBonus InvalidBonusText', async () => {
    // Arrange
    const expectedToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTA3MzcwNjIsInN1YiI6MzczLCJ0eXBlIjoiYWNjZXNzIn0.JyTOZ8boBYlq0U3Iz3oVs7Tf-eeBLmD_Kl9ml2TO4YA';

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

    const mockGetToken = jest.fn(() => expectedToken);
    AuthService.getToken.mockImplementation(mockGetToken);

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
      await BonusService.createBonus(expectedBonusText);
    } catch (error) {
      actualError = error;
    }

    // Assert
    expect(actualError).toEqual(expectedError);
    expect(AuthService.getToken).toHaveBeenCalled();
    expect(api.post).toHaveBeenCalledWith(expectedPath, expectedParams, config);
  });

  test('createBonus SendBonusToYourself', async () => {
    // Arrange
    const expectedToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTA3MzcwNjIsInN1YiI6MzczLCJ0eXBlIjoiYWNjZXNzIn0.JyTOZ8boBYlq0U3Iz3oVs7Tf-eeBLmD_Kl9ml2TO4YA';

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

    const mockGetToken = jest.fn(() => expectedToken);
    AuthService.getToken.mockImplementation(mockGetToken);

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
      await BonusService.createBonus(expectedBonusText);
    } catch (error) {
      actualError = error;
    }

    // Assert
    expect(actualError).toEqual(expectedError);
    expect(AuthService.getToken).toHaveBeenCalled();
    expect(api.post).toHaveBeenCalledWith(expectedPath, expectedParams, config);
  });

  test('update BonusesList HappyPath', async () => {
    // Arrange
    const expectedToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTA3MzcwNjIsInN1YiI6MzczLCJ0eXBlIjoiYWNjZXNzIn0.JyTOZ8boBYlq0U3Iz3oVs7Tf-eeBLmD_Kl9ml2TO4YA';

    const config = {
      headers: { Authorization: `Bearer ${expectedToken}` },
    };

    const expectedResponse = bonusResponse;

    const mockGetToken = jest.fn(() => expectedToken);
    AuthService.getToken.mockImplementation(mockGetToken);

    const mockApiServiceGet = jest.fn(
      () =>
        new Promise(resolve => {
          resolve(expectedResponse);
        }),
    );
    api.get.mockImplementation(mockApiServiceGet);

    // Act
    const actualResponse = await BonusService.fetchBonusesList(expectedToken);

    // Assert
    expect(actualResponse).toEqual(expectedResponse);
    expect(AuthService.getToken).toHaveBeenCalled();
    expect(api.get).toHaveBeenCalledWith(expectedPath, config);
  });

  test('update BonusesList invalid credentials', async () => {
    // Arrange
    const expectedToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTA3MzcwNjIsInN1YiI6MzczLCJ0eXBlIjoiYWNjZXNzIn0.JyTOZ8boBYlq0U3Iz3oVs7Tf-eeBLmD_Kl9ml2TO4YA';

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

    const mockGetToken = jest.fn(() => expectedToken);
    AuthService.getToken.mockImplementation(mockGetToken);

    const mockApiServiceGet = jest.fn(
      () =>
        new Promise((resolve, reject) => {
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
    expect(AuthService.getToken).toHaveBeenCalled();
    expect(api.get).toHaveBeenCalledWith(expectedPath, config);
  });
});
