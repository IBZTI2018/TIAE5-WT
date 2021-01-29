import types from "./types";
import api from "../api";

const _fetchOffers = (payload) => ({ type: types.FETCH_OFFERS, payload });
export const fetchOffers = () => async (dispatch) => {
  return api.find("offers", { include: "hotelroom.hotel" }, (err, resources) =>
    dispatch(_fetchOffers(resources.map((resource) => resource.toJSONTree())))
  );
};
