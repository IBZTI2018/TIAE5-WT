// States
export const hotelequipmentsState = store => store.hotelequipments;

// Selectors
export const getHotelequipments = store => hotelequipmentsState(store).hotelequipments;