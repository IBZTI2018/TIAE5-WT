defmodule BackendWeb.HotelcategoryView do
  use JSONAPI.View, type: "hotelcategories"

  alias BackendWeb.HotelView

  def fields do
    [:description, :stars]
  end

  def relationships do
    [
      hotels: {HotelView, :include}
    ]
  end
end
