defmodule BackendWeb.JoinHotelroomRoomequipmentView do
  use JSONAPI.View, type: "hotelroom_roomequipments"

  alias BackendWeb.HotelroomView
  alias BackendWeb.RoomequipmentView

  def fields do
    []
  end

  def relationships do
    [
      hotelroom: {HotelroomView, :include},
      roomequipment: {RoomequipmentView, :include}
    ]
  end
end
