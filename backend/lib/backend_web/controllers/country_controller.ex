defmodule BackendWeb.CountryController do
  use BackendWeb, :controller

  alias Backend.Database
  alias Backend.Schema

  alias BackendWeb.CountyView

  plug(JSONAPI.QueryParser,
    filter: ~w(name),
    sort: ~w(name title inserted_at),
    view: CountyView
  )

  def index(conn, _opts) do
    titles = Database.select_all(Schema.Country)

    render(conn, "index.json", %{data: titles})
  end
end
