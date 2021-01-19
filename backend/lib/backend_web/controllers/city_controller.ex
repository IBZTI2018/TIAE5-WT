defmodule BackendWeb.CityController do
  use BackendWeb, :controller

  alias Backend.Database
  alias Backend.Schema.City

  alias BackendWeb.CityView

  plug(JSONAPI.QueryParser,
    filter: ~w(postcode cityname),
    sort: ~w(postcode cityname),
    view: CityView
  )

  def index(conn, args) do
    render(conn, "index.json", %{data: Database.generic_list(City, conn.assigns.jsonapi_query)})
  end
end
