defmodule BackendWeb.TitleController do
  use BackendWeb, :controller

  alias Backend.Database
  alias Backend.Schema

  alias BackendWeb.TitleView

  plug(JSONAPI.QueryParser,
    filter: ~w(name),
    sort: ~w(name title inserted_at),
    view: TitleView
  )

  def index(conn, _opts) do
    titles = Database.select_all(Schema.Title)

    render(conn, "index.json", %{data: titles})
  end
end
