import types from "./types";
import axios from 'axios';
import api from "../api";
import store from '../store';
import { getAuthToken, getUserSelf, getUserSelfRaw } from './selectors';
import { hasBeenCached, fromCache } from '../cache';

const ADDRESS_INCLUDES = [
  'title',
  'contact_address.street.city.country',
  'billing_address.street.city.country'
].join(',');

const handleAuthResponse = (dispatch, response) => {
  if (response.status === 200 && response.data && response.data.data) {
    dispatch({type: types.AUTHENTICATE_USER, payload: {
      token: response.data.data.token,
      id: response.data.data.id,
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

export const loadCurrentUser = () => async (dispatch) => {
  const dataInStore = getUserSelf(store.getState());
  if (hasBeenCached(dataInStore)) return fromCache(dataInStore);

  return new Promise((resolve, reject) => {
    return api.get("users", "self", { include: ADDRESS_INCLUDES }, (err, resource) => {
      if (err) return reject(err);
      resolve(dispatch({ type: types.FETCH_USER_SELF, payload: resource }))
    })
  })
}

export const updateUserSelf = (changes) => async () => {
  const self = getUserSelfRaw(store.getState());

  Object.keys(changes).forEach((k) => self.set(k, changes[k]))

  return self.sync();
}

export const updateUserAddress = (payload) => async (dispatch) => {
  return axios.post('/api/complex/change_address', payload, {headers: {
    'Authorization': `Bearer ${getAuthToken(store.getState())}`
  }})
    .then(function (response) {
      return new Promise((resolve, reject) => {
        return api.get("users", "self", { include: ADDRESS_INCLUDES }, (err, resource) => {
          if (err) return reject(err);
          resolve(dispatch({ type: types.FETCH_USER_SELF, payload: resource }))
        })
      })
    })
}
