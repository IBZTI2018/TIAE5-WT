defmodule BackendWeb.HotelView do
  use JSONAPI.View, type: "hotels"

  alias BackendWeb.AddressView
  alias BackendWeb.UserView
  alias BackendWeb.HotelequipmentView

  def fields do
    [:hotelname, :image]
  end

  def relationships do
    [
      address: {AddressView, :include},
      staff: {UserView, :include},
      hotelequipment: {HotelequipmentView, :include}
    ]
  end
end
