defmodule BackendWeb.HotelroomController do
  use BackendWeb, :controller

  alias Backend.Database
  alias Backend.Schema.Hotelroom

  alias BackendWeb.HotelroomView

  plug(JSONAPI.QueryParser,
    filter: ~w(roomname roomnumber persons),
    sort: ~w(roomname roomnumber persons),
    view: HotelroomView
  )

  action_fallback(BackendWeb.FallbackController)

  def show(conn, args) do
    data = Database.generic_item(Hotelroom, args["id"], conn.assigns.jsonapi_query)
    render(conn, "show.json", %{data: data})
  end

  def create(conn, args) do
    with :ok <- can_manage_hotel(conn, args, "hotel_id"),
         {:ok, data} <- Database.generic_create(Hotelroom, args) do
      conn
      |> put_status(:created)
      |> render("show.json", %{data: data})
    end
  end

  def delete(conn, args) do
    room = Backend.Database.generic_item(Backend.Schema.Hotelroom, args["id"])

    with :ok <- can_manage_hotel(conn, room.hotel_id),
         {:ok, _} <- Database.generic_delete(Hotelroom, args["id"]) do
      send_resp(conn, 200, "")
    end
  end
end
