defmodule BackendWeb.UserController do
  use BackendWeb, :controller

  alias Backend.Database
  alias Backend.Schema.User

  alias BackendWeb.UserView

  plug(JSONAPI.QueryParser,
    filter: ~w(firstname lastname email),
    sort: ~w(firstname lastname),
    view: UserView
  )

  action_fallback(BackendWeb.FallbackController)

  def index(conn, _args) do
    data = Database.generic_list(User, conn.assigns.jsonapi_query)
    render(conn, "index.json", %{data: data})
  end

  def show(conn, args) do
    data = Database.generic_item(User, args["id"], conn.assigns.jsonapi_query)
    render(conn, "show.json", %{data: data})
  end

  def create(conn, args) do
    with {:ok, data} <- Database.generic_create(User, args) do
      conn
      |> put_status(:created)
      |> render("show.json", %{data: data})
    end
  end

  def update(conn, args) do
    with {:ok, data} <- Database.generic_update(User, args["id"], args) do
      render(conn, "show.json", %{data: data})
    end
  end

  def delete(conn, args) do
    with {:ok, _} <- Database.generic_delete(User, args["id"]) do
      send_resp(conn, 200, "")
    end
  end
end
