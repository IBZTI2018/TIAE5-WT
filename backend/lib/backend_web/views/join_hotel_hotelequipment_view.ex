defmodule BackendWeb.JoinHotelHotelequipmentView do
  use JSONAPI.View, type: "hotel_hotelequipments"

  alias BackendWeb.HotelView
  alias BackendWeb.HotelequipmentView

  def fields do
    []
  end

  def relationships do
    [
      hotel: {HotelView, :include},
      hotelequipment: {HotelequipmentView, :include}
    ]
  end
end
