import types from './types';

const initialState = {
  hoteleroomquipments: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_HOTEL_ROOM_EQUIPMENT_LIST:
      return {...state, hotelroomequipments: payload};
      break;

    default:
      return state;
      break;
  }
}
