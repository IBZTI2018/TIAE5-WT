defmodule BackendWeb.HotelroomView do
  use JSONAPI.View, type: "hotelrooms"

  alias BackendWeb.HotelView
  alias BackendWeb.PricerangeView
  alias BackendWeb.RoomequipmentView
  alias BackendWeb.OfferView

  def fields do
    [:roomname, :roomnumber, :persons]
  end

  def relationships do
    [
      hotel: {HotelView, :include},
      pricerange: {PricerangeView, :include},
      roomequipments: {RoomequipmentView, :include},
      offers: {OfferView, :include}
    ]
  end
end
