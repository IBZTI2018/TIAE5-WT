// States
export const reservationsState = (store) => store.reservations;

// Selectors
export const isLoading = (store) => reservationsState(store).offers;
export const reservations = (store) => reservationsState(store).reservations;
