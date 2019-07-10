import CommentService from './CommentService';
import api from './ApiService';
import expectedResponse from '../mock_data/commentResponse';

jest.mock('./ApiService');

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

    // Act
    const actualResponse = await CommentService.createComment(expectedToken, expectedCommentText, expectedBonusId);

    // Assert
    expect(actualResponse).toEqual(expectedResponse);
    expect(api.post).toBeCalledWith(expectedPath, expectedParams, config);
  });
});
