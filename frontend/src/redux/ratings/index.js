import types from './types';

const initialState = {
  ratings: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.CREATE_RATING:
      return {
        ...state,
        ratings: [...state.ratings, payload]
      }
      break;
  }
  
  return state;
}
