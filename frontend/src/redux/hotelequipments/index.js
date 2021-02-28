import types from './types';

const initialState = {
    hotelequipments: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.FETCH_HOTELEQUIPMENTS:
            return {
                ...state,
                hotelequipments: payload
            }
            break;
    }
    
    return state;
}
