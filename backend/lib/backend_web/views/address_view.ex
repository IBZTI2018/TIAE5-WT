defmodule BackendWeb.AddressView do
  use JSONAPI.View, type: "addresses"

  alias BackendWeb.StreetView

  def fields do
    [:streetname, :active]
  end

  def relationships do
    [
      street: {StreetView, :include}
    ]
  end
end
