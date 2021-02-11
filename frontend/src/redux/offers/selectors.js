import moment from "moment";

// States
export const offersState = store => store.offers;

// Selectors
export const getOffers = store => offersState(store).offers;
export const isFetching = store => offersState(store).isFetching;
export const getSearchQuery = store => offersState(store).searchQuery;
export const getStartDate = store => offersState(store).startDate;
export const getEndDate = store => offersState(store).endDate;
export const getStartDateFormatted = store => moment(offersState(store).startDate).format('YYYY-MM-DD');
export const getEndDateFormatted = store => moment(offersState(store).endDate).format('YYYY-MM-DD');
export const getGuestCounter = store => offersState(store).guestCounter;