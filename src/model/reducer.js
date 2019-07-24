export default (state, action) => {
  if (action.type === 'UPDATE_POINTS') {
    console.log(state, action);
    return { currentUser: action.currentUser };
  }
  return state;
};
