// States
export const RoomEquipmentState = store => store.hotelequipments;


// Selectors
export const getRoomEquipment = store => RoomEquipmentState(store).hotelequipments;

// Alternativ
// export const getHotels = store => store.hotels.hotels;
