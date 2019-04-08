import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import React from 'react';

import {
  render, fireEvent, wait,
} from 'react-testing-library';
import SendBonusForm from './SendBonusForm';

describe('SendBonusForm', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('should call bonusService.createBonus on submit', async () => {
    // Arrange
    const expectedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTA3MzcwNjIsInN1YiI6MzczLCJ0eXBlIjoiYWNjZXNzIn0.JyTOZ8boBYlq0U3Iz3oVs7Tf-eeBLmD_Kl9ml2TO4YA';
    const expectedBonusCount = '+1';
    const expectedReceiver = '@albert.fazullin';
    const expectedTag = '#create-awesomeness';
    const expectedBonusText = `${expectedBonusCount} ${expectedReceiver} ${expectedTag}`;

    const mockAuthService = class {
      static getToken = jest.fn(() => expectedToken);
    };
    jest.mock('../../../services/AuthService', () => mockAuthService);

    const mockBonusService = class {
      static createBonus = jest.fn(
        () => new Promise((resolve) => {
          resolve();
        }),
      );
    };

    jest.mock('../../../services/BonusService', () => mockBonusService);

    const { getByTestId } = render(<SendBonusForm bonusService={mockBonusService} authService={mockAuthService} onSuccess={() => {}} />);
    const textArea = getByTestId('test-textarea');
    fireEvent.change(textArea, { target: { value: expectedBonusText } });
    const form = getByTestId('test-bonus-form');

    // Act
    fireEvent.submit(form);

    // Assert
    await wait(() => {
      expect(mockAuthService.getToken).toHaveBeenCalledTimes(1);
      expect(mockBonusService.createBonus).toBeCalledWith(expectedToken, expectedBonusText);
    });
  });

  test('should call bonusService.createBonus on submit and show error message when not enough points', async () => {
    // Arrange
    const expectedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTA3MzcwNjIsInN1YiI6MzczLCJ0eXBlIjoiYWNjZXNzIn0.JyTOZ8boBYlq0U3Iz3oVs7Tf-eeBLmD_Kl9ml2TO4YA';
    const expectedBonusCount = '+10000000000';
    const expectedReceiver = '@albert.fazullin';
    const expectedTag = '#create-awesomeness';
    const expectedBonusText = `${expectedBonusCount} ${expectedReceiver} ${expectedTag}`;

    const expectedErrorMessage = "You can't give more points than 500.";
    const expectedResponse = `{"errors":[{"source":{"pointer":"/data/attributes/base"},"detail":"${expectedErrorMessage}"}]}`;
    const expectedError = { response: { request: { response: expectedResponse } } };

    const mockAuthService = class {
      static getToken = jest.fn(() => expectedToken);
    };
    jest.mock('../../../services/AuthService', () => mockAuthService);

    const mockBonusService = class {
      static createBonus = jest.fn(
        () => new Promise((resolve, reject) => {
          reject(expectedError);
        }),
      );
    };
    jest.mock('../../../services/BonusService', () => mockBonusService);

    const { getByTestId } = render(<SendBonusForm bonusService={mockBonusService} authService={mockAuthService} onSuccess={() => {}} />);
    const textArea = getByTestId('test-textarea');

    fireEvent.change(textArea, { target: { value: expectedBonusText } });

    const form = getByTestId('test-bonus-form');
    const errorContainer = getByTestId('test-error-container');

    // Act
    fireEvent.submit(form);


    // Assert
    await wait(() => {
      expect(mockBonusService.createBonus).toBeCalledWith(expectedToken, expectedBonusText);
      expect(errorContainer).toHaveTextContent(expectedErrorMessage);
    });
  });
});
