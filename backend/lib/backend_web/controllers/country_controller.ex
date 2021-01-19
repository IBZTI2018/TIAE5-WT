defmodule BackendWeb.CountryController do
  use BackendWeb, :controller

  alias Backend.Database
  alias Backend.Schema.Country

  alias BackendWeb.CountyView

  plug(JSONAPI.QueryParser,
    filter: ~w(isocode countryname),
    sort: ~w(isocode countryname),
    view: CountyView
  )

  def index(conn, args) do
    render(conn, "index.json", %{data: Database.generic_list(Country, conn.assigns.jsonapi_query)})
  end
end
