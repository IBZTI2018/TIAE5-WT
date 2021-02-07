import types from './types';

const initialState = {
    priceranges: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.FETCH_PRICERANGES:
            return {
                ...state,
                priceranges: payload
            }
            break;
    }
    
    return state;
}
