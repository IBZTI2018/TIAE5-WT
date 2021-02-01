import types from './types';

const initialState = {
  hotelroom: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_HOTEL_ROOM_LIST:
      return {...state, hotelroom: payload};
      break;

    default:
      return state;
      break;
  }
}
