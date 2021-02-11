import moment from "moment";

// States
export const offersState = (store) => store.offers;

// Selectors
export const getOffers = (store) => offersState(store).offers;
export const isFetching = (store) => offersState(store).isFetching;
export const getSearchQuery = (store) => offersState(store).searchQuery;
export const getStartDate = (store) => offersState(store).startDate;
export const getEndDate = (store) => offersState(store).endDate;
export const getStartDateFormatted = (store) => {
  let startDate = offersState(store).startDate;
  if (startDate) {
    return moment(startDate).format("YYYY-MM-DD");
  }
  return null;
};
export const getEndDateFormatted = (store) => {
  let endDate = offersState(store).endDate;
  if (endDate) {
    return moment(endDate).format("YYYY-MM-DD");
  }
  return null;
};
export const getGuestCounter = (store) => offersState(store).guestCounter;
