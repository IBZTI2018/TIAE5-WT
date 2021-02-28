import types from "./types";
import api from "../api";

export const fetchHotelequipments = () => async (dispatch) => {
  return api.find(
    "hotelequipments",
    (err, resources) => {
      resources = resources || [];
      const payload = resources.map((resource) => resource.toJSONTree());
      dispatch({ type: types.FETCH_HOTELEQUIPMENTS, payload });
    }
  );
};
