defmodule BackendWeb.HotelController do
  use BackendWeb, :controller

  alias Backend.Database
  alias Backend.Schema.Hotel

  alias BackendWeb.HotelView

  plug(JSONAPI.QueryParser,
    filter: ~w(hotelname),
    sort: ~w(hotelname),
    view: HotelView
  )

  action_fallback(BackendWeb.FallbackController)

  def index(conn, _args) do
    data = Database.generic_list(Hotel, conn.assigns.jsonapi_query)

    # We apply a custom filter to this API, so that only managers
    # can query a list of hotels and only the hotels they manage!
    # TODO: Move pre-query and let the DB do the heavy lifting
    filtered_data = Enum.filter(data, &(&1.id in conn.assigns.managed_hotels))

    render(conn, "index.json", %{data: filtered_data})
  end

  def show(conn, args) do
    data = Database.generic_item(Hotel, args["id"], conn.assigns.jsonapi_query)
    render(conn, "show.json", %{data: data})
  end

  def create(conn, args) do
    with {:ok, data} <- Database.generic_create(Hotel, args) do
      conn
      |> put_status(:created)
      |> render("show.json", %{data: data})
    end
  end

  def update(conn, args) do
    with {:ok, data} <- Database.generic_update(Hotel, args["id"], args) do
      render(conn, "show.json", %{data: data})
    end
  end

  def delete(conn, args) do
    with {:ok, _} <- Database.generic_delete(Hotel, args["id"]) do
      send_resp(conn, 200, "")
    end
  end
end
