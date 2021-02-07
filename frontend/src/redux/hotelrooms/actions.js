import api from "../api";

export const createHotelroom = (newItem) => async (dispatch) => {
  var hotelroom = api.create("hotelrooms");
  Object.keys(newItem).forEach((k) => hotelroom.set(k, newItem[k]))

  return hotelroom.sync();
};
