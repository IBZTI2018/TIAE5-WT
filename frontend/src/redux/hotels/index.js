import types from './types';

const initialState = {
  hotels: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_HOTEL_LIST:
      return {...state, hotels: payload};
      break;

    default:
      return state;
      break;
  }
}
