defmodule BackendWeb.HotelroomView do
  use JSONAPI.View, type: "hotelrooms"

  alias BackendWeb.HotelView
  alias BackendWeb.PricerangeView
  alias BackendWeb.RoomequipmentView

  def fields do
    [:roomname, :roomnumber, :persons]
  end

  def relationships do
    [
      hotel: {HotelView, :include},
      pricerange: {PricerangeView, :include},
      roomequipments: {RoomequipmentView, :include}
    ]
  end
end
