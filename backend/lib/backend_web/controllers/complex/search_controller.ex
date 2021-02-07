defmodule BackendWeb.SearchController do
  use BackendWeb, :controller

  alias Backend.Database

  plug(BackendWeb.Plugs.Authorizer when action in [:search_hotels])

  action_fallback(BackendWeb.FallbackController)

  @invalid_search_chars ~r/[^0-9A-zÄÖÜäöüÉÈÀéèà]/
  @search_query """
  SELECT o.id FROM offers o
    INNER JOIN hotelrooms hr
      ON o.hotelroom_id = hr.id
    INNER JOIN hotels h
      ON hr.hotel_id = h.id
    INNER JOIN addresses a
      ON h.address_id = a.id
    INNER JOIN streets s
      ON a.street_id = s.id
    INNER JOIN cities c
      ON s.city_id = c.id
    WHERE h.hotelname LIKE '%$1%'
      OR c.cityname LIKE '%$1%';
  """

  def search_hotels(conn, %{"query" => query}) do
    with secure_string <- String.replace(query, @invalid_search_chars, "%"),
         secure_query <- String.replace(@search_query, "$1", secure_string),
         {:ok, %MyXQL.Result{rows: r}} <- Ecto.Adapters.SQL.query(Backend.Repo, secure_query),
         offer_ids <- Enum.map(r, fn [x] -> x end) do
      data = Database.get_offers_list(offer_ids)
      render(conn, BackendWeb.OfferView, "index.json", %{data: data})
    else
      _ -> {:error, :bad_request}
    end
  end
end
