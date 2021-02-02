import types from "./types";
import api from "../api";

export const fetchCountries = () => async (dispatch) => {
  return api.find("countries", {}, (err, resources) => {
    resources = resources || []
    const payload = resources.map((resource) => resource.toJSONTree())
    dispatch({ type: types.FETCH_COUNTRIES, payload })
  });
};
