import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import BonusService from '../../../services/BonusService';
import Context from '../../context/Context';
import SendBonusForm from '.';
import * as types from '../../../models/actionTypes';

import mockBonus from '../../../mock_data/mockBonus';

jest.mock('../../../services/BonusService');

describe('SendBonusForm', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('should call BonusService.createBonus on submit', async () => {
    // Arrange
    const expectedBonusCount = '+1';
    const expectedReceiver = '@albert.fazullin';
    const expectedTag = '#create-awesomeness';
    const expectedBonusText = `${expectedBonusCount} ${expectedReceiver} ${expectedTag}`;

    const expectedNewBonusAction = {
      type: types.UPDATE_BONUS_LIST_AFTER_ADD_BONUS_SUCCESS,
      payload: mockBonus,
    };

    const expectedAllowanceBalanceAction = {
      type: types.UPDATE_ALLOWANCE_BALANCE,
      payload: mockBonus.sender['allowance-balance'],
    };

    const mockCreateBonus = jest.fn(() => Promise.resolve(mockBonus));

    BonusService.createBonus.mockImplementation(mockCreateBonus);

    const { getByTestId } = render(
      <Context.Provider value={{ dispatch }}>
        <SendBonusForm />,
      </Context.Provider>,
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

    expect(dispatch).toHaveBeenNthCalledWith(1, expectedNewBonusAction);
    expect(dispatch).toHaveBeenNthCalledWith(2, expectedAllowanceBalanceAction);
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
      <Context.Provider value={{ dispatch }}>
        <SendBonusForm />,
      </Context.Provider>,
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
});

describe('HelperIcon', () => {
  const dispatch = jest.fn();

  test('Should change the className on user change in textarea value', () => {
    // Arrange
    const { getByTestId } = render(
      <Context.Provider value={{ dispatch }}>
        <SendBonusForm />,
      </Context.Provider>,
    );
    const textArea = getByTestId('test-textarea');
    const expectedBonusText = '#create-awesomeness';

    // Act
    fireEvent.change(textArea, { target: { value: expectedBonusText } });

    const bonusForm = getByTestId('test-bonus-form');
    // Assert
    expect(bonusForm).toMatchSnapshot();
  });
});
