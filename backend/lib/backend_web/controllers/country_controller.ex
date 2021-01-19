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
    data = Database.generic_list(Country, conn.assigns.jsonapi_query)
    render(conn, "index.json", %{data: data})
  end

  def show(conn, args) do
    data = Database.generic_item(Country, args["id"], conn.assigns.jsonapi_query)
    render(conn, "show.json", %{data: data})
  end

  def delete(conn, args) do
    with {:ok, _} <- Database.generic_delete(Country, args["id"]) do
      send_resp(conn, 200, "")
    end
  end
end
