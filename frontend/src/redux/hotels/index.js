import types from "./types";

const initialState = {
  hotels: [],
  hotel: {},
  stats: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_HOTEL_LIST:
      return { ...state, hotels: payload };
      break;

    case types.SET_CURRENT_HOTEL:
      return { ...state, hotel: payload };
      break;

    case types.SET_HOTEL_STATS:
      return { ...state, stats: payload };
      break;

    default:
      return state;
      break;
  }
};
