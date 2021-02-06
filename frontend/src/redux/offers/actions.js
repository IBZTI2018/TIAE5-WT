import types from "./types";
import api from "../api";

export const fetchOffers = () => async (dispatch) => {
  return api.find(
    "offers",
    {
      include: [
        "hotelroom.hotel.address.street.city.country",
        "hotelroom.hotel.ratings",
      ].join(","),
    },
    (err, resources) => {
      resources = resources || [];
      const payload = resources.map((resource) => resource.toJSONTree());
      dispatch({ type: types.FETCH_OFFERS, payload });
    }
  );
};
