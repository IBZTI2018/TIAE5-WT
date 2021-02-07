// States
export const HotelEquipmentState = store => store.hotelequipments;


// Selectors
export const getHotelEquipment = store => HotelEquipmentState(store).hotelequipments;

// Alternativ
// export const getHotels = store => store.hotels.hotels;
