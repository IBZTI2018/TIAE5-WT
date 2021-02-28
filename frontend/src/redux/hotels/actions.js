import types from "./types";
import api from "../api";
import complexApi from "../complexApi";
import axios from 'axios';
import store from '../store';
import { getAuthToken } from '../auth/selectors';
import Resource from '../../redux/resource';

const SINGLE_HOTEL_INCLUDES = [
  'ratings.reservation.user',
  'hotelrooms.offers',
  //'hotelrooms.offers.reservations',
  'hotelcategory',
  'hotelequipments'
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

      const customResource = new Resource(resource._raw, resource._client);
      const payload = customResource.toJSONTree();

      dispatch({type: types.SET_CURRENT_HOTEL, payload})
      resolve(payload);
    })
  })
}

export const fetchHotelStats = (hotelId) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    complexApi.get("stats/hotels", hotelId, {}, (err, resource) => {
      if (err) return reject(err);
      dispatch({type: types.SET_HOTEL_STATS, payload: resource._raw})
      resolve(resource._raw);
    })
  })
}

export const dropHotelPromo = (hotelId, promoContent) => async () => {
  const path = `/api/complex/promo/hotels/${hotelId}`;
  return axios.post(path, {contents: promoContent}, {headers: {Authorization: `Bearer ${getAuthToken(store.getState())}`}})
}
