import * as types from './actionTypes';
import reducer from './reducer';

import mockBonusList from '../mock_data/mockBonusList';

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
      payload: mockBonusList,
    };

    const expectedState = {
      user: {
        id: '',
        pointsLeft: 0,
        name: '',
      },
      bonusList: mockBonusList,
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

  test('Action type: UPDATE_BONUS_LIST_AFTER_ADD_COMMENT_SUCCESS', () => {
    // Arrange
    const expectedInitialStateWithBonusList = {
      user: {
        id: '1',
        pointsLeft: 0,
        name: 'Test User',
      },
      bonusList: [
        { id: 1, text: 'text 1' },
        { id: 2, text: 'text 2' },
        { id: 3, text: 'text 3' },
        { id: 4, text: 'text 4' },
        { id: 5, text: 'text 5' },
        { id: 6, text: 'text 6' },
        { id: 7, text: 'text 7' },
        { id: 8, text: 'text 8' },
        { id: 9, text: 'text 9' },
        { id: 10, text: 'text 10' },
      ],
      isBonusListLoading: false,
      hasBonusListError: false,
      isUserLoading: false,
      hasUserError: false,
    };

    const expectedAction = {
      type: types.UPDATE_BONUS_LIST_AFTER_ADD_COMMENT_SUCCESS,
      payload: { id: 3, text: 'updated text 3' },
    };

    const expectedState = {
      user: {
        id: '1',
        pointsLeft: 0,
        name: 'Test User',
      },
      bonusList: [
        { id: 1, text: 'text 1' },
        { id: 2, text: 'text 2' },
        { id: 3, text: 'updated text 3' },
        { id: 4, text: 'text 4' },
        { id: 5, text: 'text 5' },
        { id: 6, text: 'text 6' },
        { id: 7, text: 'text 7' },
        { id: 8, text: 'text 8' },
        { id: 9, text: 'text 9' },
        { id: 10, text: 'text 10' },
      ],
      isUserLoading: false,
      hasUserError: false,
      isBonusListLoading: false,
      hasBonusListError: false,
    };

    // Act
    const actualState = reducer(expectedInitialStateWithBonusList, expectedAction);

    // Assert
    expect(actualState).toStrictEqual(expectedState);
    expect(actualState).not.toBe(expectedInitialState);
  });

  describe('Action type: UPDATE_BONUS_LIST_AFTER_ADD_BONUS_SUCCESS', () => {
    test('Empty bonus list', () => {
      // Arrange
      const expectedInitialStateBonuses = {
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

      const expectedNewBonus = {
        id: 1,
      };

      const expectedAction = {
        type: types.UPDATE_BONUS_LIST_AFTER_ADD_BONUS_SUCCESS,
        payload: expectedNewBonus,
      };

      const expectedState = {
        user: {
          id: '',
          pointsLeft: 0,
          name: '',
        },
        bonusList: [expectedNewBonus],
        isBonusListLoading: false,
        hasBonusListError: false,
        isUserLoading: false,
        hasUserError: false,
      };
      // Act
      const actualState = reducer(expectedInitialStateBonuses, expectedAction);
      // Assert
      expect(actualState).toEqual(expectedState);
      expect(actualState).not.toBe(expectedInitialStateBonuses);
    });

    test('Bonus list has length < 10', () => {
      // Arrange
      const expectedInitialStateBonuses = {
        user: {
          id: '',
          pointsLeft: 0,
          name: '',
        },
        bonusList: [{ id: 2 }, { id: 3 }],
        isBonusListLoading: false,
        hasBonusListError: false,
        isUserLoading: false,
        hasUserError: false,
      };

      const expectedNewBonus = {
        id: 1,
      };

      const expectedAction = {
        type: types.UPDATE_BONUS_LIST_AFTER_ADD_BONUS_SUCCESS,
        payload: expectedNewBonus,
      };

      const expectedState = {
        user: {
          id: '',
          pointsLeft: 0,
          name: '',
        },
        bonusList: [expectedNewBonus, { id: 2 }, { id: 3 }],
        isBonusListLoading: false,
        hasBonusListError: false,
        isUserLoading: false,
        hasUserError: false,
      };
      // Act
      const actualState = reducer(expectedInitialStateBonuses, expectedAction);
      // Assert
      expect(actualState).toEqual(expectedState);
      expect(actualState).not.toBe(expectedInitialStateBonuses);
    });

    test('Bonus list has length 10', () => {
      // Arrange
      const expectedInitialStateBonuses = {
        user: {
          id: '',
          pointsLeft: 0,
          name: '',
        },
        bonusList: [
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
          { id: 7 },
          { id: 8 },
          { id: 9 },
          { id: 10 },
          { id: 11 },
        ],
        isBonusListLoading: false,
        hasBonusListError: false,
        isUserLoading: false,
        hasUserError: false,
      };

      const expectedNewBonus = {
        id: 1,
      };

      const expectedAction = {
        type: types.UPDATE_BONUS_LIST_AFTER_ADD_BONUS_SUCCESS,
        payload: expectedNewBonus,
      };

      const expectedState = {
        user: {
          id: '',
          pointsLeft: 0,
          name: '',
        },
        bonusList: [
          expectedNewBonus,
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
          { id: 7 },
          { id: 8 },
          { id: 9 },
          { id: 10 },
        ],
        isBonusListLoading: false,
        hasBonusListError: false,
        isUserLoading: false,
        hasUserError: false,
      };
      // Act
      const actualState = reducer(expectedInitialStateBonuses, expectedAction);
      // Assert
      expect(actualState).toEqual(expectedState);
      expect(actualState).not.toBe(expectedInitialStateBonuses);
    });
  });

  test('Action type: UPDATE_ALLOWANCE_BALANCE', () => {
    // Arrange
    const expectedCurrentState = {
      user: {
        id: '18',
        pointsLeft: 0,
        name: 'Lol lol',
      },
      bonusList: [],
      isBonusListLoading: false,
      hasBonusListError: false,
      isUserLoading: false,
      hasUserError: false,
    };

    const expectedAllowanceBalance = 200;

    const expectedAction = {
      type: types.UPDATE_ALLOWANCE_BALANCE,
      payload: expectedAllowanceBalance,
    };

    const expectedState = {
      user: {
        id: '18',
        pointsLeft: expectedAllowanceBalance,
        name: 'Lol lol',
      },
      bonusList: [],
      isBonusListLoading: false,
      hasBonusListError: false,
      isUserLoading: false,
      hasUserError: false,
    };

    // Act
    const actualState = reducer(expectedCurrentState, expectedAction);

    // Assert
    expect(actualState).toEqual(expectedState);
    expect(actualState).not.toBe(expectedCurrentState);
  });
});
