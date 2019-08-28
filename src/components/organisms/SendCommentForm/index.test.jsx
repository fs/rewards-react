import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import CommentService from '../../../services/CommentService';
import Context from '../../context/Context';
import SendCommentForm from '.';

import mockBonusWithNewComment from '../../../mock_data/mockBonusWithNewComment';

jest.mock('../../../services/CommentService');

describe('SendCommentForm', () => {
  const dispatch = jest.fn();
  const expectedBonusId = '555';

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('should call CommentService.createComment on submit', async () => {
    // Arrange
    const expectedCommentCount = '+1';
    const expectedTag = '#create-awesomeness';
    const expectedCommentText = `${expectedCommentCount} ${expectedTag}`;

    const mockCreateComment = jest.fn(() => Promise.resolve([mockBonusWithNewComment]));

    CommentService.createComment.mockImplementation(mockCreateComment);

    const { getByTestId } = render(
      <Context.Provider value={{ dispatch }}>
        <SendCommentForm onSuccess={() => {}} bonusId={expectedBonusId} />,
      </Context.Provider>,
    );
    const textArea = getByTestId('test-textarea');
    fireEvent.change(textArea, { target: { value: expectedCommentText } });
    const form = getByTestId('test-comment-form');

    // Act
    fireEvent.submit(form);

    // Assert
    await wait(() => {
      expect(CommentService.createComment).toHaveBeenCalledWith(expectedCommentText, expectedBonusId);
      expect(dispatch).toHaveBeenCalled();
    });
  });

  test('should call CommentService.createComment on submit and show error message when not enough points', async () => {
    // Arrange
    const expectedCommentCount = '+10000000000';
    const expectedTag = '#create-awesomeness';
    const expectedCommentText = `${expectedCommentCount} ${expectedTag}`;

    const expectedErrorMessage = "You can't give more points than 500.";
    const expectedResponse = `{"errors":[{"source":{"pointer":"/data/attributes/base"},"detail":"${expectedErrorMessage}"}]}`;
    const expectedError = { response: { request: { response: expectedResponse } } };

    const mockCreateComment = jest.fn(
      () =>
        new Promise((resolve, reject) => {
          reject(expectedError);
        }),
    );
    CommentService.createComment.mockImplementation(mockCreateComment);

    const { getByTestId } = render(
      <Context.Provider value={{ dispatch }}>
        <SendCommentForm onSuccess={() => {}} bonusId={expectedBonusId} />,
      </Context.Provider>,
    );
    const textArea = getByTestId('test-textarea');

    fireEvent.change(textArea, { target: { value: expectedCommentText } });

    const form = getByTestId('test-comment-form');
    const errorContainer = getByTestId('test-error-container');

    // Act
    fireEvent.submit(form);

    // Assert
    await wait(() => {
      expect(CommentService.createComment).toHaveBeenCalledWith(expectedCommentText, expectedBonusId);
      expect(errorContainer).toHaveTextContent(expectedErrorMessage);
    });
  });
});

describe('HelperIcon', () => {
  const dispatch = jest.fn();
  const expectedBonusId = '555';

  test('Should change the className on user change in textarea value', () => {
    // Arrange
    const { getByTestId } = render(
      <Context.Provider value={{ dispatch }}>
        <SendCommentForm onSuccess={() => {}} bonusId={expectedBonusId} />,
      </Context.Provider>,
    );
    const textArea = getByTestId('test-textarea');
    const expectedCommentText = '#create-awesomeness';

    // Act
    fireEvent.change(textArea, { target: { value: expectedCommentText } });

    const commentForm = getByTestId('test-comment-form');
    // Assert
    expect(commentForm).toMatchSnapshot();
  });
});
