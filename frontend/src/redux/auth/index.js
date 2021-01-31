import types from './types';

const initialState = {
  auth: {
    loggedIn: false,
    authToken: null
  }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.AUTHENTICATE_USER:
      return {
        ...state,
        auth: {
          loggedIn: true,
          authToken: payload.token
        }
      }   
      break;

    case types.UNAUTHENTICATE_USER:
      return {
        ...state,
        auth: {
          loggedIn: false,
          authToken: null
        }
      }
      break;

    default:
      return state;
      break;
  }
}
