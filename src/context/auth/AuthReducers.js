export const initialState = {
  // userData: null,
  isLoading: true,
  loginUserNotFound: false,
  userToken: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNIN':
      return {
        isLoading: false,
        loginUserNotFound: action.loginUserNotFound,
        userToken: action.userToken,
      };
    case 'SIGNUP':
      return {
        ...state,
        userToken: action.userToken,
      };
    case 'RESTORE_TOKEN':
      return {
        ...state,
        isLoading: false,
        userToken: action.userToken,
      };
    case 'SIGNOUT':
      return {
        ...state,
        isLoading: false,
        userToken: null,
      };
    default:
      return state;
  }
};
