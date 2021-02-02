import types from "./types";
import api from "../api";

export const fetchRoomEquipment = () => async (dispatch) => {
  api.find("hotelequipments", {}, (err, resources) => {
    resources = resources || []
    resources = resources.map((resource) => resource.toJSONTree());
    dispatch({type: types.SET_ROOM_EQUIPMENT_LIST, payload: resources})
  });
}