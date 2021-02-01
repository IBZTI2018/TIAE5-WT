// States
export const hotelsState = store => store.hotels;


// Selectors
export const getHotels = store => hotelsState(store).hotels;

// Alternativ
// export const getHotels = store => store.hotels.hotels;
