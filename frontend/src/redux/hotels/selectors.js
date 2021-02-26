// States
export const hotelsState = store => store.hotels;

// Selectors
export const getHotels = store => hotelsState(store).hotels;
export const getHotel = store => hotelsState(store).hotel;
export const getHotelStats = store => hotelsState(store).stats;
