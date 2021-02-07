// States
export const offersState = store => store.offers;

// Selectors
export const getOffers = store => offersState(store).offers;