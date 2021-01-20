defmodule BackendWeb.HotelroomView do
  use JSONAPI.View, type: "hotels"

  alias BackendWeb.HotelView
  alias BackendWeb.PricerangeView
  alias BackendWeb.RoomequipmentView

  def fields do
    [:roomname, :roomnumber]
  end

  def relationships do
    [
      hotel: {HotelView, :include},
      pricerange: {PricerangeView, :include},
      roomequipments: {RoomequipmentView, :include}
    ]
  end
end
