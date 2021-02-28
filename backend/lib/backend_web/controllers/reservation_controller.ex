defmodule BackendWeb.ReservationController do
  use BackendWeb, :controller
  require Ecto.Query

  alias Backend.Database
  alias Backend.Schema.Offer
  alias Backend.Schema.Reservation

  alias BackendWeb.ReservationView

  plug(JSONAPI.QueryParser,
    filter: ~w(checkin checkout paid),
    sort: ~w(checkin checkout),
    view: ReservationView
  )

  action_fallback(BackendWeb.FallbackController)

  @book_offer_args %{"data" => %{"attributes" => %{"booked" => true}}}

  def index(conn, _args) do
    with true <- conn.assigns.logged_in do
      # Scope request to only include reservations for the current user
      data =
        Database.generic_list(Reservation, conn.assigns.jsonapi_query, fn query ->
          query |> Ecto.Query.where(user_id: ^conn.assigns.user.id)
        end)

      render(conn, "index.json", %{data: data})
    else
      false -> {:error, :unauthorized}
    end
  end

  def show(conn, args) do
    # TODO: Protect this from anyone accessing

    data = Database.generic_item(Reservation, args["id"], conn.assigns.jsonapi_query)
    render(conn, "show.json", %{data: data})
  end

  def create(conn, args) do
    with true <- conn.assigns.logged_in,
         {:ok, offer} <- get_possible_offer(args["data"]),
         {:ok, _} <- Database.generic_update(Offer, offer.id, @book_offer_args),
         {:ok, reservation} <- Database.generic_create(Reservation, args) do
      conn.assigns.user.email
      |> Backend.Email.booking_confirmation_email()
      |> Backend.Mailer.deliver_now()

      conn
      |> put_status(:created)
      |> render("show.json", %{data: reservation})
    else
      {:error, :not_found} -> {:error, :not_found}
      {:error, :already_booked} -> {:error, :conflict}
      false -> {:error, :forbidden}
      error -> error
    end
  end

  defp get_possible_offer(data) do
    attrs = Map.get(data, "attributes", %{})

    case Map.get(attrs, "offer_id") do
      nil ->
        {:error, :not_found}

      offer_id ->
        offer = Database.generic_item(Offer, offer_id)
        if offer.booked, do: {:error, :already_booked}, else: {:ok, offer}
    end
  end

  def delete(conn, args) do
    reservation = Database.generic_item(Reservation, args["id"])

    with true <- conn.assigns.logged_in,
         true <- conn.assigns.user.id == reservation.user_id,
         {:ok, _} <- Database.generic_delete(Reservation, args["id"]) do
      send_resp(conn, 200, "")
    else
      false -> {:error, :forbidden}
      error -> error
    end
  end
end
