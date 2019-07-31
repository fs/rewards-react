import * as types from './actionTypes';
import reducer from './reducer';

describe('reducer', () => {
  const expectedInitialState = {
    user: {
      id: '',
      pointsLeft: 0,
      name: '',
    },
    bonusList: [],
    isBonusListLoading: false,
    hasBonusListError: false,
    isUserLoading: false,
    hasUserError: false,
  };

  test('UPDATE_USER_SUCCESS', () => {
    // Arrange
    const expectedPayload = {
      id: '39',
      name: 'Vasya Poopking',
      pointsLeft: 500,
    };

    const expectedAction = {
      type: types.UPDATE_USER_SUCCESS,
      payload: expectedPayload,
    };

    const expectedState = {
      user: expectedPayload,
      bonusList: [],
      isUserLoading: false,
      hasUserError: false,
      isBonusListLoading: false,
      hasBonusListError: false,
    };

    // Act
    const actualState = reducer(expectedInitialState, expectedAction);

    // Assert
    expect(actualState).toEqual(expectedState);
    expect(actualState).not.toBe(expectedInitialState);
  });
});
