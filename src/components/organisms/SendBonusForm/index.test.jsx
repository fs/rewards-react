import '@testing-library/jest-dom/extend-expect';

import 'jest-styled-components';

import React from 'react';

import { render, fireEvent, wait, act } from '@testing-library/react';
import AuthService from '../../../services/AuthService';
import BonusService from '../../../services/BonusService';

import SendBonusForm from '.';

jest.mock('../../../services/AuthService');
jest.mock('../../../services/BonusService');

describe('SendBonusForm', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('should call bonusService.createBonus on submit', async () => {
    // Arrange
    const expectedBonusCount = '+1';
    const expectedReceiver = '@albert.fazullin';
    const expectedTag = '#create-awesomeness';
    const expectedBonusText = `${expectedBonusCount} ${expectedReceiver} ${expectedTag}`;

    const mockCreateBonus = jest.fn(
      () =>
        new Promise(resolve => {
          resolve();
        }),
    );

    BonusService.createBonus.mockImplementation(mockCreateBonus);

    const { getByTestId } = render(
      <SendBonusForm bonusService={BonusService} authService={AuthService} onSuccess={() => {}} />,
    );
    const textArea = getByTestId('test-textarea');
    fireEvent.change(textArea, { target: { value: expectedBonusText } });
    const form = getByTestId('test-bonus-form');

    // Act
    fireEvent.submit(form);

    // Assert
    await wait(() => {
      expect(BonusService.createBonus).toHaveBeenCalledWith(expectedBonusText);
    });
  });

  test('should call bonusService.createBonus on submit and show error message when not enough points', async () => {
    // Arrange
    const expectedBonusCount = '+10000000000';
    const expectedReceiver = '@albert.fazullin';
    const expectedTag = '#create-awesomeness';
    const expectedBonusText = `${expectedBonusCount} ${expectedReceiver} ${expectedTag}`;

    const expectedErrorMessage = "You can't give more points than 500.";
    const expectedResponse = `{"errors":[{"source":{"pointer":"/data/attributes/base"},"detail":"${expectedErrorMessage}"}]}`;
    const expectedError = { response: { request: { response: expectedResponse } } };

    const mockCreateBonus = jest.fn(
      () =>
        new Promise((resolve, reject) => {
          reject(expectedError);
        }),
    );
    BonusService.createBonus.mockImplementation(mockCreateBonus);

    const { getByTestId } = render(
      <SendBonusForm bonusService={BonusService} authService={AuthService} onSuccess={() => {}} />,
    );
    const textArea = getByTestId('test-textarea');

    fireEvent.change(textArea, { target: { value: expectedBonusText } });

    const form = getByTestId('test-bonus-form');
    const errorContainer = getByTestId('test-error-container');

    // Act
    fireEvent.submit(form);

    // Assert
    await wait(() => {
      expect(BonusService.createBonus).toHaveBeenCalledWith(expectedBonusText);
      expect(errorContainer).toHaveTextContent(expectedErrorMessage);
    });
  });
  describe('HelperIcon', () => {
    test('Should change the className on user change in textarea value', () => {
      // Arrange
      const { getByTestId } = render(
        <SendBonusForm bonusService={BonusService} authService={AuthService} onSuccess={() => {}} />,
      );
      const textArea = getByTestId('test-textarea');
      const expectedBonusText = '#create-awesomeness';
      // Act
      act(() => {
        fireEvent.change(textArea, { target: { value: expectedBonusText } });
      });
      const bonusForm = getByTestId('test-bonus-form');
      // Assert
      expect(bonusForm).toMatchSnapshot();
    });
  });
});
