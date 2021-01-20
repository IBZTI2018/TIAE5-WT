defmodule BackendWeb.AddressController do
  use BackendWeb, :controller

  alias Backend.Database
  alias Backend.Schema.Address

  alias BackendWeb.AddressView

  plug(JSONAPI.QueryParser,
    filter: ~w(housenumber active),
    sort: ~w(housenumber),
    view: AddressView
  )

  action_fallback(BackendWeb.FallbackController)

  def index(conn, _args) do
    data = Database.generic_list(Address, conn.assigns.jsonapi_query)
    render(conn, "index.json", %{data: data})
  end

  def show(conn, args) do
    data = Database.generic_item(Address, args["id"], conn.assigns.jsonapi_query)
    render(conn, "show.json", %{data: data})
  end

  def create(conn, args) do
    with {:ok, data} <- Database.generic_create(Address, args) do
      conn
      |> put_status(:created)
      |> render("show.json", %{data: data})
    end
  end

  def update(conn, args) do
    with {:ok, data} <- Database.generic_update(Address, args["id"], args) do
      render(conn, "show.json", %{data: data})
    end
  end

  def delete(conn, args) do
    with {:ok, _} <- Database.generic_delete(Address, args["id"]) do
      send_resp(conn, 200, "")
    end
  end
end
