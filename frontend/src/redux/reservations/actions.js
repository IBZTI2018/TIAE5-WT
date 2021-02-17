import types from "./types";
import api from '../api';

const RESERVATION_INCLUDES = [
  'offer.hotelroom.hotel',
  'rating'
].join(',');

export const fetchReservations = () => async (dispatch) => {
  dispatch({ type: types.IS_FETCHING, payload: true });

  // TODO: Scope this to a user. Maybe on backend?
  return new Promise((resolve, reject) => {
    api.find("reservations", {include: RESERVATION_INCLUDES}, (err, resources) => {
        if (err) reject(err);

        resources = resources || [];
        const payload = resources.map((resource) => resource.toJSONTree());
  
        dispatch({ type: types.IS_FETCHING, payload: false });
        dispatch({ type: types.FETCH_RESERVATIONS, payload });
      
        resolve();
      }
    );
  })
};
