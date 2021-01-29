import types from './types';

const initialState = {
    searchQuery: '',
    startDate: null,
    endDate: null,
    guestCounter: 1
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.SET_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: payload.searchQuery
            }
            break;
        case types.SET_START_DATE:
            return {
                ...state,
                startDate: payload.startDate
            }
            break;
        case types.SET_END_DATE:
            return {
                ...state,
                endDate: payload.endDate
            }
            break;
        case types.DECREASE_GUEST_COUNTER:
        case types.INCREASE_GUEST_COUNTER:
        case types.SET_GUEST_COUNTER: {
            let newGuestCounter = state.guestCounter;
            switch (type) {
                case types.DECREASE_GUEST_COUNTER: {
                    newGuestCounter = state.guestCounter - 1;
                    break;
                }
        
                case types.INCREASE_GUEST_COUNTER: {
                    newGuestCounter = state.guestCounter + 1;
                    break;
                }
        
                case types.SET_GUEST_COUNTER: {
                    newGuestCounter = payload.guestCounter;
                    break;
                }
            }

            if (newGuestCounter > 100) {
                newGuestCounter = 100;
            }
            else if (newGuestCounter < 1) {
                newGuestCounter = 1;
            }

            return {
                ...state,
                guestCounter: newGuestCounter
            }
        }
    }
    
    return state;
}
