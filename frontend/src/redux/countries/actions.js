import types from "./types";
import api from "../api";
import store from '../store';
import { getCountries } from './selectors';
import { hasBeenCached } from '../cache';

export const fetchCountries = () => async (dispatch) => {
  if (hasBeenCached(getCountries(store.getState()))) return;

  return api.find("countries", {}, (err, resources) => {
    resources = resources || []
    const payload = resources.map((resource) => resource.toJSONTree())
    dispatch({ type: types.FETCH_COUNTRIES, payload })
  });
};
