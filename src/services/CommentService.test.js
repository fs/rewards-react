import CommentService from './CommentService';
import api from './ApiService';
import AuthService from './AuthService';
import expectedResponse from '../mock_data/commentResponse';

jest.mock('./ApiService');
jest.mock('./AuthService');

describe('CommentService', () => {
  const expectedBonusId = 460;
  const expectedPath = `/user/bonuses/${expectedBonusId}/comments`;

  beforeEach(() => {
    jest.resetModules();
  });

  test('createComment HappyPath', async () => {
    // Arrange
    const expectedToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTA3MzcwNjIsInN1YiI6MzczLCJ0eXBlIjoiYWNjZXNzIn0.JyTOZ8boBYlq0U3Iz3oVs7Tf-eeBLmD_Kl9ml2TO4YA';

    const expectedCommentCount = '+1';
    const expectedTag = '#create-awesomeness';
    const expectedCommentText = `${expectedCommentCount} ${expectedTag}`;

    const expectedParams = {
      data: {
        type: 'comment-texts',
        attributes: {
          text: expectedCommentText,
        },
      },
    };
    const config = {
      headers: { Authorization: `Bearer ${expectedToken}` },
    };

    const mockApiServicePost = jest.fn(
      () =>
        new Promise(resolve => {
          resolve(expectedResponse);
        }),
    );

    api.post.mockImplementation(mockApiServicePost);

    const mockGetToken = jest.fn(() => expectedToken);

    AuthService.getToken.mockImplementation(mockGetToken);

    // Act
    const actualResponse = await CommentService.createComment(expectedCommentText, expectedBonusId);

    // Assert
    expect(actualResponse).toEqual(expectedResponse);
    expect(api.post).toHaveBeenCalledWith(expectedPath, expectedParams, config);
    expect(AuthService.getToken).toHaveBeenCalled();
  });

  test('createComment WrongToken', async () => {
    // Arrange
    const expectedToken = '';

    const expectedCommentCount = '+1';
    const expectedTag = '#create-awesomeness';
    const expectedCommentText = `${expectedCommentCount} ${expectedTag}`;

    const expectedError = {
      errors: [
        {
          id: '2084041a-b12a-4019-b77c-f71587198f0b',
          title: 'Unauthorized',
        },
      ],
    };

    const expectedParams = {
      data: {
        type: 'comment-texts',
        attributes: {
          text: expectedCommentText,
        },
      },
    };
    const config = {
      headers: { Authorization: `Bearer ${expectedToken}` },
    };

    const mockApiServicePost = jest.fn(
      () =>
        new Promise((resolve, reject) => {
          reject(expectedError);
        }),
    );

    api.post.mockImplementation(mockApiServicePost);

    const mockGetToken = jest.fn(() => expectedToken);

    AuthService.getToken.mockImplementation(mockGetToken);

    // Act
    let actualError;
    try {
      await CommentService.createComment(expectedCommentText, expectedBonusId);
    } catch (error) {
      actualError = error;
    }
    // Assert
    expect(actualError).toEqual(expectedError);
    expect(api.post).toHaveBeenCalledWith(expectedPath, expectedParams, config);
    expect(AuthService.getToken).toHaveBeenCalled();
  });

  test('createComment EmptyText', async () => {
    // Arrange
    const expectedToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTA3MzcwNjIsInN1YiI6MzczLCJ0eXBlIjoiYWNjZXNzIn0.JyTOZ8boBYlq0U3Iz3oVs7Tf-eeBLmD_Kl9ml2TO4YA';

    const expectedCommentCount = '';
    const expectedTag = '';
    const expectedCommentText = `${expectedCommentCount} ${expectedTag}`;

    const expectedError = {
      errors: [
        {
          source: {
            pointer: '/data/attributes/text',
          },
          detail: "can't be blank",
        },
      ],
    };

    const expectedParams = {
      data: {
        type: 'comment-texts',
        attributes: {
          text: expectedCommentText,
        },
      },
    };
    const config = {
      headers: { Authorization: `Bearer ${expectedToken}` },
    };

    const mockApiServicePost = jest.fn(
      () =>
        new Promise((resolve, reject) => {
          reject(expectedError);
        }),
    );

    api.post.mockImplementation(mockApiServicePost);

    const mockGetToken = jest.fn(() => expectedToken);

    AuthService.getToken.mockImplementation(mockGetToken);

    // Act
    let actualError;
    try {
      await CommentService.createComment(expectedCommentText, expectedBonusId);
    } catch (error) {
      actualError = error;
    }
    // Assert
    expect(actualError).toEqual(expectedError);
    expect(api.post).toHaveBeenCalledWith(expectedPath, expectedParams, config);
    expect(AuthService.getToken).toHaveBeenCalled();
  });

  test('createComment NotEnoughBonuses', async () => {
    // Arrange
    const expectedToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTA3MzcwNjIsInN1YiI6MzczLCJ0eXBlIjoiYWNjZXNzIn0.JyTOZ8boBYlq0U3Iz3oVs7Tf-eeBLmD_Kl9ml2TO4YA';

    const expectedCommentCount = '+1999999';
    const expectedTag = '#create-awesomeness';
    const expectedCommentText = `${expectedCommentCount} ${expectedTag}`;

    const expectedError = {
      errors: [
        {
          source: {
            pointer: '/data/attributes/base',
          },
          detail: "You can't give more points than 312.",
        },
      ],
    };

    const expectedParams = {
      data: {
        type: 'comment-texts',
        attributes: {
          text: expectedCommentText,
        },
      },
    };
    const config = {
      headers: { Authorization: `Bearer ${expectedToken}` },
    };

    const mockApiServicePost = jest.fn(
      () =>
        new Promise((resolve, reject) => {
          reject(expectedError);
        }),
    );

    api.post.mockImplementation(mockApiServicePost);

    const mockGetToken = jest.fn(() => expectedToken);

    AuthService.getToken.mockImplementation(mockGetToken);

    // Act
    let actualError;
    try {
      await CommentService.createComment(expectedCommentText, expectedBonusId);
    } catch (error) {
      actualError = error;
    }
    // Assert
    expect(actualError).toEqual(expectedError);
    expect(api.post).toHaveBeenCalledWith(expectedPath, expectedParams, config);
    expect(AuthService.getToken).toHaveBeenCalled();
  });

  test('createComment ZeroBonuses', async () => {
    // Arrange
    const expectedToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTA3MzcwNjIsInN1YiI6MzczLCJ0eXBlIjoiYWNjZXNzIn0.JyTOZ8boBYlq0U3Iz3oVs7Tf-eeBLmD_Kl9ml2TO4YA';

    const expectedCommentCount = '+0';
    const expectedTag = '#create-awesomeness';
    const expectedCommentText = `${expectedCommentCount} ${expectedTag}`;

    const expectedError = {
      errors: [
        {
          source: {
            pointer: '/data/attributes/points',
          },
          detail: 'must be greater than 0',
        },
      ],
    };

    const expectedParams = {
      data: {
        type: 'comment-texts',
        attributes: {
          text: expectedCommentText,
        },
      },
    };
    const config = {
      headers: { Authorization: `Bearer ${expectedToken}` },
    };

    const mockApiServicePost = jest.fn(
      () =>
        new Promise((resolve, reject) => {
          reject(expectedError);
        }),
    );

    api.post.mockImplementation(mockApiServicePost);

    const mockGetToken = jest.fn(() => expectedToken);

    AuthService.getToken.mockImplementation(mockGetToken);

    // Act
    let actualError;
    try {
      await CommentService.createComment(expectedCommentText, expectedBonusId);
    } catch (error) {
      actualError = error;
    }
    // Assert
    expect(actualError).toEqual(expectedError);
    expect(api.post).toHaveBeenCalledWith(expectedPath, expectedParams, config);
    expect(AuthService.getToken).toHaveBeenCalled();
  });
});
