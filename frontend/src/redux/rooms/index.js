import types from './types';

const initialState = {
  hotelrooms: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_HOTEL_ROOM_LIST:
      return {...state, hotelrooms: payload};
      break;

    default:
      return state;
      break;
  }
}
