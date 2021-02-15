import types from './types';

const initialState = {
  isLoading: true,
  reservations: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_RESERVATIONS:
      return {
          ...state,
          reservations: payload
      }
      break;
    case types.CREATE_RESERVATION:
      return {
          ...state,
          roomequipments: [...state.reservations, payload]
      }
      break;
    case types.IS_FETCHING:
      return {
          ...state,
          isLoading: payload
      }
      break;
    }
    
    return state;
}
