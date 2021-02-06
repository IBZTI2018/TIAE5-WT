import types from './types';

const initialState = {
    countries: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.FETCH_COUNTRIES:
            return {
                ...state,
                countries: payload
            }
            break;
    }
    
    return state;
}
