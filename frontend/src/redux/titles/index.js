import types from './types';

const initialState = {
    titles: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.FETCH_TITLES:
            return {
                ...state,
                titles: payload
            }
            break;
    }
    
    return state;
}
