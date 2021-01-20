defmodule BackendWeb.RoomequipmentController do
  use BackendWeb, :controller

  alias Backend.Database
  alias Backend.Schema.Roomequipment

  alias BackendWeb.RoomequipmentView

  plug(JSONAPI.QueryParser,
    filter: ~w(description),
    sort: ~w(description),
    view: RoomequipmentView
  )

  action_fallback(BackendWeb.FallbackController)

  def index(conn, _args) do
    data = Database.generic_list(Roomequipment, conn.assigns.jsonapi_query)
    render(conn, "index.json", %{data: data})
  end

  def show(conn, args) do
    data = Database.generic_item(Roomequipment, args["id"], conn.assigns.jsonapi_query)
    render(conn, "show.json", %{data: data})
  end

  def create(conn, args) do
    with {:ok, data} <- Database.generic_create(Roomequipment, args) do
      conn
      |> put_status(:created)
      |> render("show.json", %{data: data})
    end
  end

  def update(conn, args) do
    with {:ok, data} <- Database.generic_update(Roomequipment, args["id"], args) do
      render(conn, "show.json", %{data: data})
    end
  end

  def delete(conn, args) do
    with {:ok, _} <- Database.generic_delete(Roomequipment, args["id"]) do
      send_resp(conn, 200, "")
    end
  end
end
