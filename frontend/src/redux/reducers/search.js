import actionTypes from '../actionTypes';

const initialState = {
    searchQuery: '',
    startDate: null,
    endDate: null,
    guestCounter: 1
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.SET_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: payload.searchQuery
            }
            break;
        case actionTypes.SET_START_DATE:
            return {
                ...state,
                startDate: payload.startDate
            }
            break;
        case actionTypes.SET_END_DATE:
            return {
                ...state,
                endDate: payload.endDate
            }
            break;
        case actionTypes.DECREASE_GUEST_COUNTER:
        case actionTypes.INCREASE_GUEST_COUNTER:
        case actionTypes.SET_GUEST_COUNTER: {
            let newGuestCounter = state.guestCounter;
            switch (type) {
                case actionTypes.DECREASE_GUEST_COUNTER: {
                    newGuestCounter = state.guestCounter - 1;
                    break;
                }
        
                case actionTypes.INCREASE_GUEST_COUNTER: {
                    newGuestCounter = state.guestCounter + 1;
                    break;
                }
        
                case actionTypes.SET_GUEST_COUNTER: {
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
