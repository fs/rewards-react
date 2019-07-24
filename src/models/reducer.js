const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_POINTS':
      return { pointsLeft: action.payload };
    case 'SAVE_USER_ID':
      return { userId: action.payload };
    default:
      return state;
  }
};

export default reducer;
