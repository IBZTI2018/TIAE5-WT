import types from './types';

const LOCAL_STORAGE_TOKEN = 'tiae5AuthToken';
const LOCAL_STORAGE_EMAIL = 'tiae5UserMail';
const LOCAL_STORAGE_FIRSTNAME = 'tiae5UserFirstName';
const LOCAL_STORAGE_LASTNAME = 'tiae5UserLastName';
const LOCAL_STORAGE_ISMANAGER = 'tiae5UserIsManager';

const initialUserState = {
  firstname: null,
  lastname: null,
  email: null,
  isManager: false
}

const initialState = {
  isLoggedIn: false,
  authToken: null,
  user: initialUserState,
  self: null
}

const dumpStateOnLocalStorage = (payload) => {
  window.localStorage.setItem(LOCAL_STORAGE_TOKEN, payload.token);
  window.localStorage.setItem(LOCAL_STORAGE_EMAIL, payload.email);
  window.localStorage.setItem(LOCAL_STORAGE_FIRSTNAME, payload.firstname);
  window.localStorage.setItem(LOCAL_STORAGE_LASTNAME, payload.lastname);
  window.localStorage.setItem(LOCAL_STORAGE_ISMANAGER, payload.isManager);
}

const clearStateOnLocalStorage = () => {
  window.localStorage.removeItem(LOCAL_STORAGE_TOKEN);
  window.localStorage.removeItem(LOCAL_STORAGE_EMAIL);
  window.localStorage.removeItem(LOCAL_STORAGE_FIRSTNAME);
  window.localStorage.removeItem(LOCAL_STORAGE_LASTNAME);
  window.localStorage.removeItem(LOCAL_STORAGE_ISMANAGER);
}

const loadStateFromLocalStorage = () => {
  const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN);
  const email = window.localStorage.getItem(LOCAL_STORAGE_EMAIL);
  const firstname = window.localStorage.getItem(LOCAL_STORAGE_FIRSTNAME);
  const lastname = window.localStorage.getItem(LOCAL_STORAGE_LASTNAME);
  const isManager = window.localStorage.getItem(LOCAL_STORAGE_ISMANAGER) === "true";

  if (email && token) return {
    isLoggedIn: true, authToken: token, user: {
      email, firstname, lastname, isManager
    }
  };
  return initialState;
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.AUTHENTICATE_USER:
      dumpStateOnLocalStorage(payload);

      return {
        ...state,
        isLoggedIn: true,
        authToken: payload.token,
        user: {
          email: payload.email,
          firstname: payload.firstname,
          lastname: payload.lastname,
          isManager: payload.isManager
        }
      }   
      break;

    case types.UNAUTHENTICATE_USER:
      clearStateOnLocalStorage();

      return {
        ...state,
        isLoggedIn: false,
        authToken: null,
        user: initialUserState,
        self: null
      }
      break;

    case types.FETCH_USER_SELF:
      return {
        ...state,
        self: payload
      }

    case "@@INIT":
      return loadStateFromLocalStorage();
      break;

    default:
      return state;
      break;
  }
}
