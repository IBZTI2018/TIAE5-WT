defmodule BackendWeb.JoinHotelHotelequipmentController do
  use BackendWeb, :controller

  require Ecto.Query

  alias Backend.Database
  alias Backend.Schema.JoinHotelHotelequipment

  alias BackendWeb.JoinHotelHotelequipmentView

  plug(JSONAPI.QueryParser,
    filter: ~w(),
    sort: ~w(),
    view: JoinHotelHotelequipmentView
  )

  action_fallback(BackendWeb.FallbackController)

  def create(conn, args) do
    with :ok <- can_manage_hotel(conn, args, "hotel_id"),
         {:ok, data} <- Database.generic_create(JoinHotelHotelequipment, args) do
      conn
      |> put_status(:created)
      |> render("show.json", %{data: data})
    end
  end

  def delete(conn, args) do
    # We don't fetch the join table, so we don't knwo the actual ID of the entry.
    # Since the MyXQL adapter does not support composite primary keys properly, we trick a bit here
    # Instead of the actual id, we expect `hotel_id:hotelequipment_id`
    [hotel_id, hotelequipment_id] = String.split("#{args["id"]}", ":", parts: 2)

    [join] =
      Backend.Database.generic_list(JoinHotelHotelequipment, %JSONAPI.Config{}, fn query ->
        query
        |> Ecto.Query.where(hotel_id: ^hotel_id)
        |> Ecto.Query.where(hotelequipment_id: ^hotelequipment_id)
      end)

    with :ok <- can_manage_hotel(conn, join.hotel_id),
         {:ok, _} <- Database.generic_delete(JoinHotelHotelequipment, join.id) do
      send_resp(conn, 200, "")
    end
  end
end
