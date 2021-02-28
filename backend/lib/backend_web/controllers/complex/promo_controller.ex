defmodule BackendWeb.PromoController do
  use BackendWeb, :controller

  alias Backend.Database
  alias Backend.Schema.Media

  plug(BackendWeb.Plugs.Authorizer when action in [:create_hotel_promo])

  action_fallback(BackendWeb.FallbackController)

  @doc """

  """
  def get_hotel_promo(conn, args) do
    promo = Database.generic_item(Media, args["id"], %JSONAPI.Config{})

    conn
    |> put_resp_content_type("application/pdf")
    |> send_resp(200, promo.contents)
  end

  @doc """
  Endpoint for changing an address at /api/complex/promo/hotels/:id

  Expects the following JSON payload
  {
    contents: base64encoded-blob
  }
  """
  def create_hotel_promo(conn, args) do
    with true <- conn.assigns.logged_in,
         {:ok, hotel_id} <- Map.fetch(args, "id"),
         :ok <- can_manage_hotel(conn, hotel_id),
         {:ok, contents} <- Map.fetch(args, "contents"),
         {:ok, contents} <- Base.decode64(contents),
         {:ok, _media} <-
           Database.generic_create(Media, %{
             "data" => %{"attributes" => %{"contents" => contents, "hotel_id" => hotel_id}}
           }) do
      json(conn, %{success: true})
    else
      false -> {:error, :unauthorized}
      :error -> {:error, :bad_request}
    end
  end
end
