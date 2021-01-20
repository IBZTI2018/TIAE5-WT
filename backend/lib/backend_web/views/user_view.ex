defmodule BackendWeb.UserView do
  use JSONAPI.View, type: "users"

  alias BackendWeb.TitleView
  alias BackendWeb.AddressView

  def fields do
    [:firstname, :lastname, :email]
  end

  def relationships do
    [
      title: {TitleView, :include},
      contact_address: {AddressView, :include},
      billing_address: {AddressView, :include}
    ]
  end
end
