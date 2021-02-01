// States
export const hotelRoomsState = store => store.hotelrooms;


// Selectors
export const getHotelRooms = store => hotelRoomsState(store).hotels;

// Alternativ
// export const getHotels = store => store.hotels.hotels;
