defmodule BackendWeb.StreetView do
  use JSONAPI.View, type: "streets"

  alias BackendWeb.CityView

  def fields do
    [:streetname]
  end

  def relationships do
    [
      City: {CityView, :include}
    ]
  end
end
