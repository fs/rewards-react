import * as types from './actionTypes';
import reducer from './reducer';
import expectedBonusList from '../mock_data/bonusList';
import expectedBonusListAfterAddComment from '../mock_data/bonusListAfterAddComment';
import commentResponse from '../mock_data/commentResponse';

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

  test('Action type: UPDATE_USER_SUCCESS', () => {
    // Arrange
    const expectedUser = {
      id: '39',
      name: 'Vasya Poopking',
      pointsLeft: 500,
    };

    const expectedAction = {
      type: types.UPDATE_USER_SUCCESS,
      payload: expectedUser,
    };

    const expectedState = {
      user: expectedUser,
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

  test('Action type: UPDATE_USER_LOADING', () => {
    // Arrange
    const expectedIsUserLoading = true;
    const expectedHasUserError = false;

    const expectedAction = {
      type: types.UPDATE_USER_LOADING,
    };

    const expectedState = {
      user: {
        id: '',
        pointsLeft: 0,
        name: '',
      },
      bonusList: [],
      isUserLoading: expectedIsUserLoading,
      hasUserError: expectedHasUserError,
      isBonusListLoading: false,
      hasBonusListError: false,
    };

    // Act
    const actualState = reducer(expectedInitialState, expectedAction);

    // Assert
    expect(actualState).toEqual(expectedState);
    expect(actualState).not.toBe(expectedInitialState);
  });

  test('Action type: UPDATE_USER_ERROR', () => {
    // Arrange
    const expectedIsUserLoading = false;
    const expectedHasUserError = true;

    const expectedAction = {
      type: types.UPDATE_USER_ERROR,
    };

    const expectedState = {
      user: {
        id: '',
        pointsLeft: 0,
        name: '',
      },
      bonusList: [],
      isUserLoading: expectedIsUserLoading,
      hasUserError: expectedHasUserError,
      isBonusListLoading: false,
      hasBonusListError: false,
    };

    // Act
    const actualState = reducer(expectedInitialState, expectedAction);

    // Assert
    expect(actualState).toEqual(expectedState);
    expect(actualState).not.toBe(expectedInitialState);
  });

  test('Action type: UPDATE_BONUS_LIST_SUCCESS', () => {
    // Arrange
    const expectedIsBonusListLoading = false;
    const expectedHasBonusListError = false;

    const expectedAction = {
      type: types.UPDATE_BONUS_LIST_SUCCESS,
      payload: expectedBonusList,
    };

    const expectedState = {
      user: {
        id: '',
        pointsLeft: 0,
        name: '',
      },
      bonusList: expectedBonusList,
      isUserLoading: false,
      hasUserError: false,
      isBonusListLoading: expectedIsBonusListLoading,
      hasBonusListError: expectedHasBonusListError,
    };

    // Act
    const actualState = reducer(expectedInitialState, expectedAction);

    // Assert
    expect(actualState).toEqual(expectedState);
    expect(actualState).not.toBe(expectedInitialState);
  });

  test('Action type: UPDATE_BONUS_LIST_ERROR', () => {
    // Arrange
    const expectedIsBonusListLoading = false;
    const expectedHasBonusListError = true;

    const expectedAction = {
      type: types.UPDATE_BONUS_LIST_ERROR,
    };

    const expectedState = {
      user: {
        id: '',
        pointsLeft: 0,
        name: '',
      },
      bonusList: [],
      isUserLoading: false,
      hasUserError: false,
      isBonusListLoading: expectedIsBonusListLoading,
      hasBonusListError: expectedHasBonusListError,
    };

    // Act
    const actualState = reducer(expectedInitialState, expectedAction);

    // Assert
    expect(actualState).toEqual(expectedState);
    expect(actualState).not.toBe(expectedInitialState);
  });

  test('Action type: UPDATE_BONUS_LIST_LOADING', () => {
    // Arrange
    const expectedIsBonusListLoading = true;
    const expectedHasBonusListError = false;

    const expectedAction = {
      type: types.UPDATE_BONUS_LIST_LOADING,
    };

    const expectedState = {
      user: {
        id: '',
        pointsLeft: 0,
        name: '',
      },
      bonusList: [],
      isUserLoading: false,
      hasUserError: false,
      isBonusListLoading: expectedIsBonusListLoading,
      hasBonusListError: expectedHasBonusListError,
    };

    // Act
    const actualState = reducer(expectedInitialState, expectedAction);

    // Assert
    expect(actualState).toEqual(expectedState);
    expect(actualState).not.toBe(expectedInitialState);
  });

  test('Action type: undefined', () => {
    // Arrange
    const expectedAction = {
      type: undefined,
    };

    // Act
    const actualState = reducer(expectedInitialState, expectedAction);

    // Assert
    expect(actualState).toBe(expectedInitialState);
  });

  test('Action type: UPDATE_BONUS_LIST_AFTER_ADD_COMMENT_SUCCESS', () => {
    // Arrange

    const expectedInitialStateWithBonusList = {
      user: {
        id: '1',
        pointsLeft: 0,
        name: 'Test User',
      },
      bonusList: expectedBonusList,
      isBonusListLoading: false,
      hasBonusListError: false,
      isUserLoading: false,
      hasUserError: false,
    };

    const expectedAction = {
      type: types.UPDATE_BONUS_LIST_AFTER_ADD_COMMENT_SUCCESS,
      payload: commentResponse,
    };

    const expectedState = {
      user: {
        id: '1',
        pointsLeft: 0,
        name: 'Test User',
      },
      bonusList: expectedBonusListAfterAddComment,
      isUserLoading: false,
      hasUserError: false,
      isBonusListLoading: false,
      hasBonusListError: false,
    };

    // Act
    const actualState = reducer(expectedInitialStateWithBonusList, expectedAction);

    // Assert
    expect(actualState).toBe(expectedState);
    expect(actualState).not.toBe(expectedInitialState);
  });
});
