defmodule BackendWeb.CityController do
  use BackendWeb, :controller

  alias Backend.Database
  alias Backend.Schema

  alias BackendWeb.CityView

  plug(JSONAPI.QueryParser,
    filter: ~w(postcode cityname),
    sort: ~w(postcode cityname),
    view: CityView
  )

  def index(conn, opts) do
    IO.inspect(opts)

    render(conn, "index.json", %{data: Database.list_cities()})
  end
end
