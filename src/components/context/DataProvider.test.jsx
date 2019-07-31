import {
  UPDATE_USER_LOADING,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_BONUS_LIST_SUCCESS,
  UPDATE_BONUS_LIST_LOADING,
  UPDATE_BONUS_LIST_ERROR,
} from '../../models/actionTypes';
import expectedBonusResponse from '../../mock_data/bonusResponse';
import expectedBonusList from '../../mock_data/bonusList';

import mockProfileService from '../../services/ProfileService';
import mockBonusService from '../../services/BonusService';

import { fetchUserData, fetchBonuses } from './DataProvider';

jest.mock('../../services/ProfileService');
jest.mock('../../services/BonusService');

describe('DataProvider', () => {
  describe('fetchUserData', () => {
    test('happy path', async () => {
      // Arrange
      const expectedId = '39';
      const expectedPointsLeft = 469;
      const expectedName = 'Vasya Poopking';
      const expectedPayload = {
        id: expectedId,
        pointsLeft: expectedPointsLeft,
        name: expectedName,
      };
      const expectedData = {
        id: expectedId,
        type: 'users',
        attributes: {
          email: 'vasya.poopking@flatstack.com',
          'full-name': expectedName,
          username: 'vasya.poopking',
          'profile-image-avatar-url':
            'https://d14n4flg6h47l7.cloudfront.net/store/user/39/profile_image/avatar-58e3224793345ae993f75a6f373f3567.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIJWLCQQNSWJW7QQA%2F20190528%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20190528T082822Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=9d3bd2740547bbffd76501b63526d4ae402e1afcc7be5584d1a2de0aaa5e7dab',
          'bonus-balance': 79,
          'allowance-balance': expectedPointsLeft,
        },
      };
      const expectedUserResponse = { data: expectedData };

      const expectedStartRequestAction = { type: UPDATE_USER_LOADING };
      const expectedSucceedRequestAction = { type: UPDATE_USER_SUCCESS, payload: expectedPayload };
      const mockDispatch = jest.fn();
      mockProfileService.fetchUser.mockImplementation(
        () =>
          new Promise(resolve => {
            resolve(expectedUserResponse);
          }),
      );

      // Act
      await fetchUserData(mockDispatch);

      // Assert
      expect(mockDispatch).toHaveBeenNthCalledWith(1, expectedStartRequestAction);
      expect(mockDispatch).toHaveBeenLastCalledWith(expectedSucceedRequestAction);
    });

    test('error occurred', async () => {
      // Arrange
      const expectedStartRequestAction = { type: UPDATE_USER_LOADING };
      const expectedErrorRequestAction = { type: UPDATE_USER_ERROR };
      const mockDispatch = jest.fn();

      const mockFetchUser = jest.fn(
        () =>
          new Promise((resolve, reject) => {
            reject();
          }),
      );

      mockProfileService.fetchUser.mockImplementation(mockFetchUser);

      // Act
      await fetchUserData(mockDispatch);

      // Assert
      expect(mockDispatch).toHaveBeenNthCalledWith(1, expectedStartRequestAction);
      expect(mockDispatch).toHaveBeenLastCalledWith(expectedErrorRequestAction);
    });
  });

  describe('fetchBonuses', () => {
    test('happy path', async () => {
      // Arrange
      const expectedSucceedRequestAction = { type: UPDATE_BONUS_LIST_SUCCESS, payload: expectedBonusList };
      const expectedStartRequestAction = { type: UPDATE_BONUS_LIST_LOADING };

      const mockDispatch = jest.fn();
      mockBonusService.fetchBonusesList.mockImplementation(
        () =>
          new Promise(resolve => {
            resolve({ data: expectedBonusResponse });
          }),
      );

      // Act
      await fetchBonuses(mockDispatch);

      // Assert
      expect(mockDispatch).toHaveBeenNthCalledWith(1, expectedStartRequestAction);
      expect(mockDispatch).toHaveBeenLastCalledWith(expectedSucceedRequestAction);
    });

    test('error occurred', async () => {
      // Arrange
      const expectedStartRequestAction = { type: UPDATE_BONUS_LIST_LOADING };
      const expectedErrorRequestAction = { type: UPDATE_BONUS_LIST_ERROR };

      const mockDispatch = jest.fn();
      mockBonusService.fetchBonusesList.mockImplementation(
        () =>
          new Promise((resolve, reject) => {
            reject();
          }),
      );

      // Act
      await fetchBonuses(mockDispatch);

      // Assert
      expect(mockDispatch).toHaveBeenNthCalledWith(1, expectedStartRequestAction);
      expect(mockDispatch).toHaveBeenLastCalledWith(expectedErrorRequestAction);
    });
  });
});
