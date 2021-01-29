// States
export const searchState = store => store.search;

// Selectors
export const getSearchQuery = store => searchState(store).searchQuery;
export const getStartDate = store => searchState(store).startDate;
export const getEndDate = store => searchState(store).endDate;
export const getGuestCounter = store => searchState(store).guestCounter;