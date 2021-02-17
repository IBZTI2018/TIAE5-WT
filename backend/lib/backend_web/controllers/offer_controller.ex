defmodule BackendWeb.OfferController do
  use BackendWeb, :controller

  alias Backend.Repo
  alias Backend.Database
  alias Backend.Schema.Offer
  alias Backend.Schema.Hotelroom

  alias BackendWeb.OfferView

  plug(JSONAPI.QueryParser,
    filter: ~w(validitystart validityend),
    sort: ~w(validitystart validityend),
    view: OfferView
  )

  action_fallback(BackendWeb.FallbackController)

  def index(conn, _args) do
    data = Database.generic_list(Offer, conn.assigns.jsonapi_query)
    render(conn, "index.json", %{data: data})
  end

  def show(conn, args) do
    data = Database.generic_item(Offer, args["id"], conn.assigns.jsonapi_query)
    render(conn, "show.json", %{data: data})
  end

  def create(conn, args) do
    hotelroom_id = args["data"]["attributes"]["hotelroom_id"]
    hotelroom = Database.generic_item(Hotelroom, hotelroom_id)

    with :ok <- can_manage_hotel(conn, hotelroom.hotel_id),
         {:ok, data} <- Database.generic_create(Offer, args) do
      conn
      |> put_status(:created)
      |> render("show.json", %{data: data})
    end
  end

  def delete(conn, args) do
    offer = Database.generic_item(Offer, args["id"]) |> Repo.preload(:hotelroom)

    with :ok <- can_manage_hotel(conn, offer.hotelroom.hotel_id),
         {:ok, _} <- Database.generic_delete(Offer, args["id"]) do
      send_resp(conn, 200, "")
    end
  end
end
