import types from "./types";
import api from "../api";

const _fetchOffers = (payload) => ({ type: types.FETCH_OFFERS, payload });
export const fetchOffers = () => async (dispatch) => {
  return api.find(
    "offers",
    {
      include: [
        "hotelroom.hotel",
        "hotelroom.hotel.address",
        "hotelroom.hotel.address.street",
        "hotelroom.hotel.address.street.city",
        "hotelroom.hotel.address.street.city.country",
      ].join(','),
    },
    (err, resources) =>
      dispatch(_fetchOffers(resources.map((resource) => resource.toJSONTree())))
  );
};
