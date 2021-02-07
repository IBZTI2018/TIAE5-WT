// States
export const HotelRoomEquipmentState = store => store.hotelroomequipments;


// Selectors
export const getHotelRoomEquipment = store => HotelRoomEquipmentState(store).hotelroomequipments;

// Alternativ
// export const getHotels = store => store.hotels.hotels;
