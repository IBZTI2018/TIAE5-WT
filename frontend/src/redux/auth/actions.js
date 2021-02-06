import types from "./types";
import axios from 'axios';
import api from "../api";

const handleAuthResponse = (dispatch, response) => {
  if (response.status === 200 && response.data && response.data.data) {
    dispatch({type: types.AUTHENTICATE_USER, payload: {
      token: response.data.data.token,
      email: response.data.data.email,
      firstname: response.data.data.firstname,
      lastname: response.data.data.lastname,
      isManager: response.data.data.is_manager,
    }})
  } else {
    dispatch({type: types.UNAUTHENTICATE_USER, payload: {}})
  }
}

export const createNewUser = (payload) => async (dispatch) => {
  console.log('ayo')
  return axios.post('/api/complex/signup', payload)
  .then(function (response) {
    handleAuthResponse(dispatch, response);
  })
}

export const authenticateUser = (usermail, password) => async (dispatch) => {
  return axios.post('/api/complex/signin', {
    usermail: usermail,
    password: password
  })
  .then(function (response) {
    handleAuthResponse(dispatch, response);
  })
};

export const unauthenticateUser = () => (dispatch) => {
  dispatch({type: types.UNAUTHENTICATE_USER, payload: {}})
}

export const loadCurrentUser = () => (dispatch) => {
  const include = [
    'title',
    'contact_address.street.city.country',
    'billing_address.street.city.country'
  ].join(',');
  
  return api.get("users", "self", { include }, (err, resource) => {
    const payload = resource.toJSONTree()
    dispatch({ type: types.FETCH_USER_SELF, payload })
  });
}
