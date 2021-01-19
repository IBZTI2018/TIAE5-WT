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
    send_resp(conn, 200, "OK")
  end
end
