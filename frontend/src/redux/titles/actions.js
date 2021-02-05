import types from "./types";
import api from "../api";

export const fetchTitles = () => async (dispatch) => {
  return api.find("titles", {}, (err, resources) => {
    resources = resources || []
    const payload = resources.map((resource) => resource.toJSONTree())
    dispatch({ type: types.FETCH_TITLES, payload })
  });
};
