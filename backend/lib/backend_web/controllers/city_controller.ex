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
    data = Database.generic_list(City, conn.assigns.jsonapi_query)
    render(conn, "index.json", %{data: data})
  end

  def show(conn, args) do
    data = Database.generic_item(City, args["id"], conn.assigns.jsonapi_query)
    render(conn, "show.json", %{data: data})
  end

  def delete(conn, args) do
    with {:ok, _} <- Database.generic_delete(City, args["id"]) do
      send_resp(conn, 200, "")
    end
  end
end
