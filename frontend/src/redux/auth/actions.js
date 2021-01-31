import types from "./types";
import axios from 'axios';

export const authenticateUser = (usermail, password) => async (dispatch) => {
  return axios.post('/api/complex/signin', {
    usermail: usermail,
    password: password
  })
  .then(function (response) {
    if (response.status == 200 && response.data && response.data.data) {
      dispatch({type: types.AUTHENTICATE_USER, payload: {
        token: response.data.data.token,
        email: usermail
      }})
    } else {
      dispatch({type: types.UNAUTHENTICATE_USER, payload: {}})
    }
  })
  .catch(function (error) {
    console.error(error);
  });
};

export const unauthenticateUser = () => (dispatch) => {
  dispatch({type: types.UNAUTHENTICATE_USER, payload: {}})
}
