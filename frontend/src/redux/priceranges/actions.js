import types from "./types";
import api from "../api";

export const fetchPriceranges = () => async (dispatch) => {
  return api.find(
    "priceranges",
    (err, resources) => {
      resources = resources || [];
      const payload = resources.map((resource) => resource.toJSONTree());
      dispatch({ type: types.FETCH_PRICERANGES, payload });
    }
  );
};
