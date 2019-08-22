import * as types from './actionTypes';

const reducer = (state, action) => {
  switch (action.type) {
    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isUserLoading: false,
        hasUserError: false,
      };
    case types.UPDATE_USER_LOADING:
      return {
        ...state,
        isUserLoading: true,
        hasUserError: false,
      };
    case types.UPDATE_USER_ERROR:
      return {
        ...state,
        isUserLoading: false,
        hasUserError: true,
      };
    case types.UPDATE_BONUS_LIST_SUCCESS:
      return {
        ...state,
        bonusList: action.payload,
        isBonusListLoading: false,
        hasBonusListError: false,
      };
    case types.UPDATE_BONUS_LIST_ERROR:
      return {
        ...state,
        hasBonusListError: true,
        isBonusListLoading: false,
      };
    case types.UPDATE_BONUS_LIST_LOADING:
      return {
        ...state,
        isBonusListLoading: true,
        hasBonusListError: false,
      };
    case types.ADD_TO_BONUS_LIST: {
      const bonusListReduced = state.bonusList.length >= 10 ? state.bonusList.slice(0, -1) : state.bonusList;

      return {
        ...state,
        bonusList: [action.payload, ...bonusListReduced],
        isBonusListLoading: false,
        hasBonusListError: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;
