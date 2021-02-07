defmodule BackendWeb.RatingController do
  use BackendWeb, :controller

  alias Backend.Database
  alias Backend.Schema.Rating

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
    with {:ok, data} <- Database.generic_create(Rating, args) do
      conn
      |> put_status(:created)
      |> render("show.json", %{data: data})
    end
  end

  def update(conn, args) do
    with {:ok, data} <- Database.generic_update(Rating, args["id"], args) do
      render(conn, "show.json", %{data: data})
    end
  end

  def delete(conn, args) do
    with {:ok, _} <- Database.generic_delete(Rating, args["id"]) do
      send_resp(conn, 200, "")
    end
  end
end
