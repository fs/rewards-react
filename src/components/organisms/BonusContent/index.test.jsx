import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import React from 'react';

import { render, waitForElement } from 'react-testing-library';
import 'jest-styled-components';

import BonusService from '../../../services/BonusService';
import AuthService from '../../../services/AuthService';
import ProfileService from '../../../services/ProfileService';
import BonusContent from '.';
import mockBonusResponse from '../../../mock_data/bonusResponse';

jest.mock('../../../services/BonusService');
jest.mock('../../../services/AuthService');
jest.mock('../../../services/ProfileService');

describe('BonusContent index', () => {
  let expectedToken;

  beforeEach(() => {
    expectedToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTA3MzcwNjIsInN1YiI6MzczLCJ0eXBlIjoiYWNjZXNzIn0.JyTOZ8boBYlq0U3Iz3oVs7Tf-eeBLmD_Kl9ml2TO4YA';
    const mockGetToken = jest.fn(() => expectedToken);
    AuthService.getToken.mockImplementation(mockGetToken);
    jest.clearAllMocks();
    jest.resetModules();
  });

  test('render BonusContent correctly', () => {
    // Arrange
    // Act
    const { container } = render(<BonusContent />);
    // Assert
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render BonusList', async () => {
    // Arrange
    const expectedResponse = mockBonusResponse;
    const expectedUserData = {
      id: '39',
      type: 'users',
      attributes: {
        email: 'nadezhda.kharchuk@flatstack.com',
        'full-name': 'Nadezhda Kharchuk',
        username: 'nadezhda.kharchuk',
        'profile-image-avatar-url':
          'https://d14n4flg6h47l7.cloudfront.net/store/user/39/profile_image/avatar-58e3224793345ae993f75a6f373f3567.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIJWLCQQNSWJW7QQA%2F20190528%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190528T082822Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=9d3bd2740547bbffd76501b63526d4ae402e1afcc7be5584d1a2de0aaa5e7dab',
        'bonus-balance': 79,
        'allowance-balance': 469,
      },
    };

    const mockFetchBonusesList = jest.fn(
      () =>
        new Promise(resolve => {
          resolve({ data: expectedResponse });
        }),
    );

    BonusService.fetchBonusesList.mockImplementation(mockFetchBonusesList);

    const mockFetchUser = jest.fn(
      () =>
        new Promise(resolve => {
          resolve({ data: expectedUserData });
        }),
    );

    ProfileService.fetchUser.mockImplementation(mockFetchUser);

    // Act
    const { getByTestId } = render(<BonusContent />);

    const bonusList = await waitForElement(() => getByTestId('test-bonus-list'));

    // Assert
    expect(AuthService.getToken).toHaveBeenCalled();
    expect(ProfileService.fetchUser).toHaveBeenCalled();
    expect(BonusService.fetchBonusesList).toHaveBeenCalledWith(expectedToken);
    expect(bonusList).toBeInTheDocument();
  });

  test('should render error message if error', async () => {
    // Arrange
    const expectedError = new Error();

    const mockFetchBonusesList = jest.fn(
      () =>
        new Promise((resolve, reject) => {
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
