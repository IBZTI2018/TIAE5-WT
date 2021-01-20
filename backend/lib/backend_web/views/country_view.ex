defmodule BackendWeb.CountryView do
  use JSONAPI.View, type: "countries"

  def fields do
    [:isocode, :countryname]
  end
end
