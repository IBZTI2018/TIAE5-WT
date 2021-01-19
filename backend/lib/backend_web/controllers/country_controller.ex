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

  action_fallback(BackendWeb.FallbackController)

  def index(conn, args) do
    data = Database.generic_list(Country, conn.assigns.jsonapi_query)
    render(conn, "index.json", %{data: data})
  end

  def show(conn, args) do
    data = Database.generic_item(Country, args["id"], conn.assigns.jsonapi_query)
    render(conn, "show.json", %{data: data})
  end

  def create(conn, args) do
    with {:ok, data} <- Database.generic_create(Country, args) do
      conn
      |> put_status(:created)
      |> render("show.json", %{data: data})
    end
  end

  def update(conn, args) do
    with {:ok, data} <- Database.generic_update(Country, args["id"], args) do
      render(conn, "show.json", %{data: data})
    end
  end

  def delete(conn, args) do
    with {:ok, _} <- Database.generic_delete(Country, args["id"]) do
      send_resp(conn, 200, "")
    end
  end
end
