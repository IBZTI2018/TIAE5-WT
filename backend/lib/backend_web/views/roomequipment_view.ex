defmodule BackendWeb.RoomequipmentView do
  use JSONAPI.View, type: "roomequipments"

  alias BackendWeb.HotelroomView

  def fields do
    [:description]
  end

  def relationships do
    [
      hotelrooms: {HotelroomView, :include}
    ]
  end
end
