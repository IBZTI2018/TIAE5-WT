import types from './types';

const initialState = {
    offers: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.FETCH_OFFERS:
            return {
                ...state,
                offers: payload
            }
            break;
    }
    
    return state;
}
