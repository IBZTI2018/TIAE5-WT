defmodule BackendWeb.HotelequipmentController do
  use BackendWeb, :controller

  alias Backend.Database
  alias Backend.Schema.Hotelequipment

  alias BackendWeb.HotelequipmentView

  plug(JSONAPI.QueryParser,
    filter: ~w(description),
    sort: ~w(description),
    view: HotelequipmentView
  )

  action_fallback(BackendWeb.FallbackController)

  def index(conn, _args) do
    data = Database.generic_list(Hotelequipment, conn.assigns.jsonapi_query)
    render(conn, "index.json", %{data: data})
  end

  def show(conn, args) do
    data = Database.generic_item(Hotelequipment, args["id"], conn.assigns.jsonapi_query)
    render(conn, "show.json", %{data: data})
  end

  def create(conn, args) do
    with {:ok, data} <- Database.generic_create(Hotelequipment, args) do
      conn
      |> put_status(:created)
      |> render("show.json", %{data: data})
    end
  end

  def update(conn, args) do
    with {:ok, data} <- Database.generic_update(Hotelequipment, args["id"], args) do
      render(conn, "show.json", %{data: data})
    end
  end

  def delete(conn, args) do
    with {:ok, _} <- Database.generic_delete(Hotelequipment, args["id"]) do
      send_resp(conn, 200, "")
    end
  end
end
