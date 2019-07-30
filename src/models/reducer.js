import * as types from './actionTypes';

const reducer = (state, action) => {
  switch (action.type) {
    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case types.UPDATE_BONUS_LIST_SUCCESS:
      return {
        ...state,
        bonusList: action.payload,
        isLoading: false,
      };
    case types.UPDATE_BONUS_LIST_ERROR:
      return {
        ...state,
        hasError: action.payload,
      };
    case types.UPDATE_BONUS_LIST_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default reducer;
