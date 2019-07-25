const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'UPDATE_BONUS_LIST':
      return {
        ...state,
        bonusList: action.payload,
      };
    case 'UPDATE_BONUS_LIST_ERROR':
      return {
        ...state,
        hasError: action.payload,
      };
    case 'UPDATE_BONUS_LIST_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
