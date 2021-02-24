import types from "./types";
import api from "../api";

const SINGLE_HOTEL_INCLUDES = [
  'ratings.reservation.user',
  'hotelcategory'
].join(',')

const MULTIPLE_HOTELS_INCLUDES = [
  "hotelrooms.offers",
  "ratings.reservation.user"
].join(',')

export const fetchHotels = () => async (dispatch) => {
  api.find("hotels", { include: MULTIPLE_HOTELS_INCLUDES }, (err, resources) => {
    resources = resources || []
    resources = resources.map((resource) => resource.toJSONTree());
    dispatch({type: types.SET_HOTEL_LIST, payload: resources})
  });
}

export const fetchHotel = (hotelId) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    api.get("hotels", hotelId, {include: SINGLE_HOTEL_INCLUDES}, (err, resource) => {
      if (err) return reject(err);
      const payload = resource.toJSONTree();
      dispatch({type: types.SET_CURRENT_HOTEL, payload})
      resolve(payload);
    })
  })
}
