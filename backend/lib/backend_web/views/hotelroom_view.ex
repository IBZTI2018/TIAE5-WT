defmodule BackendWeb.HotelroomView do
  use JSONAPI.View, type: "hotels"

  alias BackendWeb.HotelView
  alias BackendWeb.PricerangeView

  def fields do
    [:roomname, :roomnumber]
  end

  def relationships do
    [
      hotel: {HotelView, :include},
      pricerange: {PricerangeView, :include}
    ]
  end
end
