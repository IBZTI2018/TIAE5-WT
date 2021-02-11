defmodule BackendWeb.ReservationController do
  use BackendWeb, :controller
  require Ecto.Query

  alias Backend.Database
  alias Backend.Schema.Reservation

  alias BackendWeb.ReservationView

  plug(JSONAPI.QueryParser,
    filter: ~w(checkin checkout paid),
    sort: ~w(checkin checkout),
    view: ReservationView
  )

  action_fallback(BackendWeb.FallbackController)

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
    data = Database.generic_item(Reservation, args["id"], conn.assigns.jsonapi_query)
    render(conn, "show.json", %{data: data})
  end

  def create(conn, args) do
    with {:ok, data} <- Database.generic_create(Reservation, args) do
      conn
      |> put_status(:created)
      |> render("show.json", %{data: data})
    end
  end

  def update(conn, args) do
    with {:ok, data} <- Database.generic_update(Reservation, args["id"], args) do
      render(conn, "show.json", %{data: data})
    end
  end

  def delete(conn, args) do
    with {:ok, _} <- Database.generic_delete(Reservation, args["id"]) do
      send_resp(conn, 200, "")
    end
  end
end
