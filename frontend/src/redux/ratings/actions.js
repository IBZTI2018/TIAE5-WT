import api from "../api";

export const createRating = (props, reservationId) => async (dispatch) => {
  let rating = api.create("ratings");
  Object.keys(props).forEach((k) => rating.set(k, props[k]))
  rating.set('reservation_id', reservationId)
  return rating.sync();
};
