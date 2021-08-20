function authReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "SET_AUTH_SUCCESS":
      return { user: payload.user, isLoading: false, isAuthenticated: true };
    case "SET_AUTH_FAIL":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}

export default authReducer;
