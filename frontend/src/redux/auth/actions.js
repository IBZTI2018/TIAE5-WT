import types from "./types";
import axios from 'axios';

const handleAuthResponse = (dispatch, response, usermail) => {
  if (response.status == 200 && response.data && response.data.data) {
    dispatch({type: types.AUTHENTICATE_USER, payload: {
      token: response.data.data.token,
      email: usermail
    }})
  } else {
    dispatch({type: types.UNAUTHENTICATE_USER, payload: {}})
  }
}

export const createNewUser = (payload) => async (dispatch) => {
  console.log('ayo')
  return axios.post('/api/complex/signup', payload)
  .then(function (response) {
    handleAuthResponse(dispatch, response, payload.email);
  })
}

export const authenticateUser = (usermail, password) => async (dispatch) => {
  return axios.post('/api/complex/signin', {
    usermail: usermail,
    password: password
  })
  .then(function (response) {
    handleAuthResponse(dispatch, response, usermail);
  })
};

export const unauthenticateUser = () => (dispatch) => {
  dispatch({type: types.UNAUTHENTICATE_USER, payload: {}})
}
