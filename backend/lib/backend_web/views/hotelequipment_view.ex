defmodule BackendWeb.HotelequipmentView do
  use JSONAPI.View, type: "hotelequipments"

  def fields do
    [:description]
  end
end
