defmodule BackendWeb.OfferView do
  use JSONAPI.View, type: "offers"

  alias BackendWeb.HotelroomView

  def fields do
    [:validitystart, :validityend, :price]
  end

  def relationships do
    [
      hotelroom: {HotelroomView, :include}
    ]
  end
end
