import types from "./types";
import api from "../api";

export const fetchRooms = () => async (dispatch) => {
  api.find("hotelrooms", {}, (err, resources) => {
    resources = resources || []
    resources = resources.map((resource) => resource.toJSONTree());
    dispatch({type: types.SET_HOTEL_ROOM_LIST, payload: resources})
  });
}