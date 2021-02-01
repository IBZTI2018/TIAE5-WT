import types from "./types";
import api from "../api";

export const fetchHotels = () => async (dispatch) => {
  api.find("hotels", {}, (err, resources) => {
    resources = resources || []
    resources = resources.map((resource) => resource.toJSONTree());
    dispatch({type: types.SET_HOTEL_LIST, payload: resources})
  });
}
