defmodule BackendWeb.HotelequipmentView do
  use JSONAPI.View, type: "hotelequipments"

  alias BackendWeb.HotelView

  def fields do
    [:hotelname]
  end

  def fields do
    [:description]
  end

  def relationships do
    [
      hotels: {HotelView, :include}
    ]
  end
end
