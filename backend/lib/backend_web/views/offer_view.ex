defmodule BackendWeb.OfferView do
  use JSONAPI.View, type: "offers"

  alias BackendWeb.HotelroomView
  alias BackendWeb.ReservationView

  def fields do
    [:validitystart, :validityend, :price, :booked]
  end

  def relationships do
    [
      hotelroom: {HotelroomView, :include},
      reservations: {ReservationView, :include}
    ]
  end
end
