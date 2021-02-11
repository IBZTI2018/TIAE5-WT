import types from "./types";
import api from "../api";

export const fetchHotels = () => async (dispatch) => {
  api.find("hotels", {}, (err, resources) => {
    resources = resources || []
    resources = resources.map((resource) => resource.toJSONTree());
    dispatch({type: types.SET_HOTEL_LIST, payload: resources})
  });
}

export const fetchHotel = (hotelId) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    api.get("hotels", hotelId, {include: "ratings,hotelcategory"}, (err, resource) => {
      if (err) return reject(err);
      const payload = resource.toJSONTree();
      dispatch({type: types.SET_CURRENT_HOTEL, payload})
      resolve(payload);
    })
  })
}
