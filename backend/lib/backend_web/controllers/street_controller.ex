defmodule BackendWeb.StreetController do
  use BackendWeb, :controller

  alias Backend.Database
  alias Backend.Schema.Street

  alias BackendWeb.StreetView

  plug(JSONAPI.QueryParser,
    filter: ~w(streetname),
    sort: ~w(streetname),
    view: StreetView
  )

  action_fallback(BackendWeb.FallbackController)

  def index(conn, _args) do
    data = Database.generic_list(Street, conn.assigns.jsonapi_query)
    render(conn, "index.json", %{data: data})
  end

  def show(conn, args) do
    data = Database.generic_item(Street, args["id"], conn.assigns.jsonapi_query)
    render(conn, "show.json", %{data: data})
  end

  def create(conn, args) do
    with {:ok, data} <- Database.generic_create(Street, args) do
      conn
      |> put_status(:created)
      |> render("show.json", %{data: data})
    end
  end

  def update(conn, args) do
    with {:ok, data} <- Database.generic_update(Street, args["id"], args) do
      render(conn, "show.json", %{data: data})
    end
  end

  def delete(conn, args) do
    with {:ok, _} <- Database.generic_delete(Street, args["id"]) do
      send_resp(conn, 200, "")
    end
  end
end
