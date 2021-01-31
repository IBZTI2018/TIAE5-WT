import types from './types';

const initialState = {
  isLoggedIn: false,
  authToken: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.AUTHENTICATE_USER:
      return {
        ...state,
        isLoggedIn: true,
        authToken: payload.token
      }   
      break;

    case types.UNAUTHENTICATE_USER:
      return {
        ...state,
        isLoggedIn: false,
        authToken: null
      }
      break;

    default:
      return state;
      break;
  }
}
