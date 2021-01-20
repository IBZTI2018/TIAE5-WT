defmodule BackendWeb.UserView do
  use JSONAPI.View, type: "users"

  alias BackendWeb.UserView
  alias BackendWeb.TitleView
  alias BackendWeb.StreetView

  def fields do
    [:firstname, :lastname, :email]
  end

  def relationships do
    [
      title: {TitleView, :include},
      contact_address: {StreetView, :include},
      billing_address: {StreetView, :include}
    ]
  end
end
