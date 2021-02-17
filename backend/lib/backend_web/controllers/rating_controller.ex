defmodule BackendWeb.RatingController do
  use BackendWeb, :controller

  alias Backend.Repo
  alias Backend.Database
  alias Backend.Schema.Rating
  alias Backend.Schema.Reservation

  alias BackendWeb.RatingView

  plug(JSONAPI.QueryParser,
    filter: ~w(score anonymous published),
    sort: ~w(score),
    view: RatingView
  )

  action_fallback(BackendWeb.FallbackController)

  def index(conn, _args) do
    data = Database.generic_list(Rating, conn.assigns.jsonapi_query)
    render(conn, "index.json", %{data: data})
  end

  def show(conn, args) do
    data = Database.generic_item(Rating, args["id"], conn.assigns.jsonapi_query)
    render(conn, "show.json", %{data: data})
  end

  def create(conn, args) do
    # reservation_id = args["data"]["relationships"]["reservation"]["data"]["id"]
    reservation_id = args["data"]["attributes"]["reservation_id"]

    reservation =
      Reservation
      |> Database.generic_item(reservation_id)
      |> Repo.preload(:offer)
      |> Repo.preload(offer: [:hotelroom])

    # We overwrite the hotel id to make sure the server-side is consistent
    hotel_id = reservation.offer.hotelroom.hotel_id
    new_attrs = Map.put(args["data"]["attributes"], "hotel_id", hotel_id)
    new_data = Map.put(args["data"], "attributes", new_attrs)
    new_args = Map.put(args, "data", new_data)

    with :gt <- Date.compare(Date.utc_today(), reservation.checkout),
         {:ok, data} <- Database.generic_create(Rating, new_args) do
      notify_hotel_owner(data)

      conn
      |> put_status(:created)
      |> render("show.json", %{data: data})
    end
  end

  def delete(conn, args) do
    rating = Database.generic_item(Rating, args["id"]) |> Repo.preload(:reservation)

    with true <- conn.assigns.logged_in,
         true <- conn.assigns.user.id == rating.reservation.user_id,
         {:ok, _} <- Database.generic_delete(Rating, args["id"]) do
      send_resp(conn, 200, "")
    else
      false -> {:error, :forbidden}
      error -> error
    end
  end

  defp notify_hotel_owner(data) do
    # If score is below 3.0, send an alert to hotel owner!
    if data.score < 3.0 do
      for owner <- Backend.Database.get_staff_for_hotel(data.hotel_id) do
        owner.user.email
        |> Backend.Email.bad_rating_email(data.hotel_id)
        |> Backend.Mailer.deliver_now()
      end
    end
  end
end
