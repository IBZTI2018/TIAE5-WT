defmodule BackendWeb.TitleController do
  use BackendWeb, :controller

  alias Backend.Database
  alias Backend.Schema.Title

  alias BackendWeb.TitleView

  plug(JSONAPI.QueryParser,
    filter: ~w(description),
    sort: ~w(description),
    view: TitleView
  )

  action_fallback(BackendWeb.FallbackController)

  def index(conn, args) do
    data = Database.generic_list(Title, conn.assigns.jsonapi_query)
    render(conn, "index.json", %{data: data})
  end

  def show(conn, args) do
    data = Database.generic_item(Title, args["id"], conn.assigns.jsonapi_query)
    render(conn, "show.json", %{data: data})
  end

  def create(conn, args) do
    with {:ok, data} <- Database.generic_create(Title, args) do
      conn
      |> put_status(:created)
      |> render("show.json", %{data: data})
    end
  end

  def update(conn, args) do
    with {:ok, data} <- Database.generic_update(Title, args["id"], args) do
      render(conn, "show.json", %{data: data})
    end
  end

  def delete(conn, args) do
    with {:ok, _} <- Database.generic_delete(Title, args["id"]) do
      send_resp(conn, 200, "")
    end
  end
end
