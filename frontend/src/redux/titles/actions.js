import types from "./types";
import api from "../api";
import store from '../store';
import { getTitles } from './selectors';
import { hasBeenCached } from '../cache';

export const fetchTitles = () => async (dispatch) => {
  if (hasBeenCached(getTitles(store.getState()))) return;

  return api.find("titles", {}, (err, resources) => {
    resources = resources || []
    const payload = resources.map((resource) => resource.toJSONTree())
    dispatch({ type: types.FETCH_TITLES, payload })
  });
};
