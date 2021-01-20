defmodule BackendWeb.HotelView do
  use JSONAPI.View, type: "hotels"

  alias BackendWeb.AddressView

  def fields do
    [:hotelname]
  end

  def relationships do
    [
      address: {AddressView, :include}
    ]
  end
end
