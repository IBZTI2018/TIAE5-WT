import types from "./types";
import api from "../api";

export const fetchHoteRoomlEquipment = () => async (dispatch) => {
  api.find("roomequipments", {}, (err, resources) => {
    resources = resources || []
    resources = resources.map((resource) => resource.toJSONTree());
    dispatch({type: types.SET_HOTEL_ROOM_EQUIPMENT_LIST, payload: resources})
  });
}