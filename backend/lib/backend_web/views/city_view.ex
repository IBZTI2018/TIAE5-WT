defmodule BackendWeb.CityView do
  use JSONAPI.View, type: "cities"

  alias BackendWeb.CountryView

  def fields do
    [:postcode, :cityname]
  end

  def relationships do
    [
      country: {CountryView, :include}
    ]
  end
end
