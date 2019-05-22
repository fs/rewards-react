import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import React from 'react';

import {
  render, waitForElement,
} from 'react-testing-library';

import BonusService from '../../../services/BonusService';
import AuthService from '../../../services/AuthService';
import BonusContent from '.';
import mockBonusResponse from '../../../mock_data/bonusResponse';

jest.mock('../../../services/BonusService');
jest.mock('../../../services/AuthService');

describe('BonusContent index', () => {
  let expectedToken;

  beforeEach(() => {
    expectedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTA3MzcwNjIsInN1YiI6MzczLCJ0eXBlIjoiYWNjZXNzIn0.JyTOZ8boBYlq0U3Iz3oVs7Tf-eeBLmD_Kl9ml2TO4YA';
    const mockGetToken = jest.fn(() => expectedToken);
    AuthService.getToken.mockImplementation(mockGetToken);
    jest.clearAllMocks();
    jest.resetModules();
  });

  test('render BonusContent correctly', () => {
    // Arrange
    // Act
    const wrapper = render(<BonusContent />);
    // Assert
    expect(wrapper).toMatchSnapshot();
  });

  test('should render BonusList', async () => {
    // Arrange
    const expectedResponse = mockBonusResponse;

    const mockFetchBonusesList = jest.fn(
      () => new Promise((resolve) => {
        resolve({ data: expectedResponse });
      }),
    );

    BonusService.fetchBonusesList.mockImplementation(mockFetchBonusesList);

    // Act
    const { getByTestId } = render(<BonusContent />);

    const bonusList = await waitForElement(() => getByTestId('test-bonus-list'));

    // Assert
    expect(AuthService.getToken).toBeCalled();
    expect(BonusService.fetchBonusesList).toBeCalledWith(expectedToken);
    expect(bonusList).toBeInTheDocument();
  });

  test('should render error message if error', async () => {
    // Arrange
    const expectedError = new Error();

    const mockFetchBonusesList = jest.fn(
      () => new Promise((resolve, reject) => {
        reject(expectedError);
      }),
    );

    BonusService.fetchBonusesList.mockImplementation(mockFetchBonusesList);

    // Act
    const { getByTestId } = render(<BonusContent />);
    const error = await waitForElement(() => getByTestId('test-error'));

    // Assert
    expect(error).toBeInTheDocument();
    expect(BonusService.fetchBonusesList).toBeCalledWith(expectedToken);
  });
});
