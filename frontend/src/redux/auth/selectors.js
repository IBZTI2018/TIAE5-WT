// States
export const authState = store => store.auth;

// Selectors
export const isLoggedIn = store => authState(store).isLoggedIn;
export const getAuthToken = store => authState(store).authToken;
