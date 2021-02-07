import types from './types';

const initialState = {
  hotelequipments: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_HOTEL_EQUIPMENT_LIST:
      return {...state, hotelequipments: payload};
      break;

    default:
      return state;
      break;
  }
}
