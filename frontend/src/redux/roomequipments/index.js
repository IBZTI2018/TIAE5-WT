import types from './types';

const initialState = {
    roomequipments: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.FETCH_ROOMEQUIPMENTS:
            return {
                ...state,
                roomequipments: payload
            }
            break;
    }
    
    return state;
}
