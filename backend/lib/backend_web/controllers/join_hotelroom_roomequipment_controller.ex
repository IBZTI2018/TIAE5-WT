defmodule BackendWeb.JoinHotelroomRoomequipmentController do
  use BackendWeb, :controller

  alias Backend.Database
  alias Backend.Schema.JoinHotelroomRoomequipment

  alias BackendWeb.JoinHotelroomRoomequipmentView

  plug(JSONAPI.QueryParser,
    filter: ~w(),
    sort: ~w(),
    view: JoinHotelroomRoomequipmentView
  )

  action_fallback(BackendWeb.FallbackController)

  def create(conn, args) do
    with :ok <- can_manage_hotel(conn, args, "hotel_id"),
         {:ok, data} <- Database.generic_create(JoinHotelroomRoomequipment, args) do
      conn
      |> put_status(:created)
      |> render("show.json", %{data: data})
    end
  end

  def delete(conn, args) do
    join = Backend.Database.generic_item(Backend.Schema.JoinHotelroomRoomequipment, args["id"])

    with :ok <- can_manage_hotel(conn, join.hotel_id),
         {:ok, _} <- Database.generic_delete(JoinHotelroomRoomequipment, args["id"]) do
      send_resp(conn, 200, "")
    end
  end
end
