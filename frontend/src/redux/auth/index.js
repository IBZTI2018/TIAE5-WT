import types from './types';

const LOCAL_STORAGE_TOKEN = 'tiae5AuthToken';
const LOCAL_STORAGE_EMAIL = 'tiae5UserMail';

const initialState = {
  isLoggedIn: false,
  authToken: null,
  userEmail: null
}

const dumpStateOnLocalStorage = (token, email) => {
  window.localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
  window.localStorage.setItem(LOCAL_STORAGE_EMAIL, email);
}

const clearStateOnLocalStorage = () => {
  window.localStorage.removeItem(LOCAL_STORAGE_TOKEN);
  window.localStorage.removeItem(LOCAL_STORAGE_EMAIL);
}

const loadStateFromLocalStorage = () => {
  const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN);
  const email = window.localStorage.getItem(LOCAL_STORAGE_EMAIL);

  if (email && token) return { isLoggedIn: true, authToken: token, userEmail: email };
  return initialState;
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.AUTHENTICATE_USER:
      dumpStateOnLocalStorage(payload.token, payload.email);

      return {
        ...state,
        isLoggedIn: true,
        authToken: payload.token,
        userEmail: payload.email
      }   
      break;

    case types.UNAUTHENTICATE_USER:
      clearStateOnLocalStorage();

      return {
        ...state,
        isLoggedIn: false,
        authToken: null,
        userEmail: null
      }
      break;

    case "@@INIT":
      return loadStateFromLocalStorage();
      break;

    default:
      return state;
      break;
  }
}