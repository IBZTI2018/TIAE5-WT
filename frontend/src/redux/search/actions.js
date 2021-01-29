import types from "./types";

export const setSearchQuery = searchQuery => ({ type: types.SET_SEARCH_QUERY, payload: { searchQuery } });
export const setStartDate = startDate => ({ type: types.SET_START_DATE, payload: { startDate } });
export const setEndDate = endDate => ({ type: types.SET_END_DATE, payload: { endDate } });
export const increaseGuestCounter = () => ({ type: types.INCREASE_GUEST_COUNTER });
export const decreaseGuestCounter = () => ({ type: types.DECREASE_GUEST_COUNTER });
export const setGuestCounter = guestCounter => ({ type: types.SET_GUEST_COUNTER, payload: { guestCounter } });
