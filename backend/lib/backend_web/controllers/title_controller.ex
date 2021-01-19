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

  def index(conn, args) do
    render(conn, "index.json", %{data: Database.generic_list(Title, conn.assigns.jsonapi_query)})
  end

  def create(conn, args) do
    send_resp(conn, 200, "OK")
  end
end
