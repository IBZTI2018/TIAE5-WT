import actionTypes from "./actionTypes";

export const setSearchQuery = searchQuery => ({ type: actionTypes.SET_SEARCH_QUERY, payload: { searchQuery } });
export const setStartDate = startDate => ({ type: actionTypes.SET_START_DATE, payload: { startDate } });
export const setEndDate = endDate => ({ type: actionTypes.SET_END_DATE, payload: { endDate } });
export const increaseGuestCounter = () => ({ type: actionTypes.INCREASE_GUEST_COUNTER });
export const decreaseGuestCounter = () => ({ type: actionTypes.DECREASE_GUEST_COUNTER });
export const setGuestCounter = guestCounter => ({ type: actionTypes.SET_GUEST_COUNTER, payload: { guestCounter } });
