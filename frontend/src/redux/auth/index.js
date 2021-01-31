import types from './types';

const initialState = {
  isLoggedIn: false,
  authToken: null,
  userEmail: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.AUTHENTICATE_USER:
      return {
        ...state,
        isLoggedIn: true,
        authToken: payload.token,
        userEmail: payload.email
      }   
      break;

    case types.UNAUTHENTICATE_USER:
      return {
        ...state,
        isLoggedIn: false,
        authToken: null,
        userEmail: null
      }
      break;

    default:
      return state;
      break;
  }
}
