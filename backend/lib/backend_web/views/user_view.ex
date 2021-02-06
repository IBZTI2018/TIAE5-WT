defmodule BackendWeb.UserView do
  use JSONAPI.View, type: "users"

  alias BackendWeb.TitleView
  alias BackendWeb.AddressView
  alias BackendWeb.HotelView

  def fields do
    [:firstname, :lastname, :email, :is_manager]
  end

  def relationships do
    [
      title: {TitleView, :include},
      contact_address: {AddressView, :include},
      billing_address: {AddressView, :include},
      hotels: {HotelView, :include}
    ]
  end
end
