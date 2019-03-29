import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import React from 'react';

import { render, fireEvent, getByTestId, act } from 'react-testing-library';
import SendBonusForm  from './SendBonusForm';

describe('SendBonusForm', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('should call bonusService.createBonus on submit', async (done) => {
    // Arrange
    const expectedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTA3MzcwNjIsInN1YiI6MzczLCJ0eXBlIjoiYWNjZXNzIn0.JyTOZ8boBYlq0U3Iz3oVs7Tf-eeBLmD_Kl9ml2TO4YA';
    const expectedBonusCount = '+1';
    const expectedReceiver = '@albert.fazullin';
    const expectedTag = '#create-awesomeness';
    const expectedBonusText = `${expectedBonusCount} ${expectedReceiver} ${expectedTag}`;
    
    const mockAuthService = class {
      static getToken = jest.fn(() => expectedToken);
    }
    jest.mock('../../../services/AuthService', () => mockAuthService);
    
    const mockBonusService = class {
      static createBonus = jest.fn(
        () => new Promise((resolve) => {
          resolve();
        }),
      );
    };

    jest.mock('../../../services/BonusService', () => mockBonusService);

    const { container } = render(<SendBonusForm bonusService={mockBonusService} authService={mockAuthService} onSuccess={() => {}} />);
    const textArea = getByTestId(container, 'test-textarea');
    fireEvent.change(textArea, { target: { value: expectedBonusText } });
    const form = getByTestId(container, 'test-form');
    
    // Act
    fireEvent.submit(form);
    // Assert
    setTimeout(() => {
      expect(mockAuthService.getToken).toHaveBeenCalledTimes(1);
      expect(mockBonusService.createBonus).toBeCalledWith(expectedToken, expectedBonusText);
      done();
    }, 0);
  });

  test('should call bonusService.createBonus on submit and show error message when not enough points', async (done) => {
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

    const { container } = render(<SendBonusForm bonusService={mockBonusService} authService={mockAuthService} onSuccess={() => {}} />);

    const textArea = getByTestId(container, 'test-textarea');

    fireEvent.change(textArea, { target: { value: expectedBonusText } });
  
    const form = getByTestId(container, 'test-form');
    const errorContainer = getByTestId(container, 'test-error-container');
    // Act
    act(() => {
      fireEvent.submit(form);
    }); 
    // Assert
    setTimeout(() => {
      expect(mockBonusService.createBonus).toBeCalledWith(expectedToken, expectedBonusText);
      expect(errorContainer).toHaveTextContent(expectedErrorMessage);
      done();
    }, 0);
  });
});
