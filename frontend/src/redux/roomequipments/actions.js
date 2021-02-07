import types from "./types";
import api from "../api";

export const fetchRoomequipments = () => async (dispatch) => {
  return api.find(
    "roomequipments",
    (err, resources) => {
      resources = resources || [];
      const payload = resources.map((resource) => resource.toJSONTree());
      dispatch({ type: types.FETCH_ROOMEQUIPMENTS, payload });
    }
  );
};
