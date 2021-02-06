// States
export const countriesState = store => store.countries;

// Selectors
export const getCountries = store => countriesState(store).countries;
