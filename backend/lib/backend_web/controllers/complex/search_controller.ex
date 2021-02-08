defmodule BackendWeb.SearchController do
  use BackendWeb, :controller

  alias Backend.Database

  plug(BackendWeb.Plugs.Authorizer when action in [:search_hotels])

  action_fallback(BackendWeb.FallbackController)

  @invalid_search_chars ~r/[^\-0-9A-zÄÖÜäöüÉÈÀéèà]/
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
    WHERE 
      (h.hotelname LIKE '%$1%' OR c.cityname LIKE '%$1%')
      AND
      (o.validitystart >= '$2' AND o.validityend <= '$3')
      AND
      (hr.persons = $4)  
    ;
  """

  today = DateTime.utc_now
  validitystart = [today.year, today.month, today.day] |> Enum.map(&to_string/1) |> Enum.map(&String.pad_leading(&1, 2, "0")) |> Enum.join("-")
  validityend = today |> Date.add(365)
  validityend = [validityend.year, validityend.month, validityend.day] |> Enum.map(&to_string/1) |> Enum.map(&String.pad_leading(&1, 2, "0")) |> Enum.join("-")

  @optional_params %{"validitystart" => validitystart, "validityend" => validityend, "persons" => 1}
  def search_hotels(conn, %{"query" => query} = params) do
    params = Map.merge(@optional_params, params)
    persons = params["persons"]
    with secure_string <- String.replace(query, @invalid_search_chars, "%"),
         secure_validitystart <- String.replace(params["validitystart"], @invalid_search_chars, "%"),
         secure_validityend <- String.replace(params["validityend"], @invalid_search_chars, "%"),
         secure_persons <- String.replace("#{persons}", @invalid_search_chars, "%"),
         secure_query <- String.replace(@search_query, "$1", secure_string),
         secure_query <- String.replace(secure_query, "$2", secure_validitystart),
         secure_query <- String.replace(secure_query, "$3", secure_validityend),
         secure_query <- String.replace(secure_query, "$4", secure_persons),
         {:ok, %MyXQL.Result{rows: r}} <- Ecto.Adapters.SQL.query(Backend.Repo, secure_query),
         offer_ids <- Enum.map(r, fn [x] -> x end) do
      data = Database.get_offers_list(offer_ids)
      render(conn, BackendWeb.OfferView, "index.json", %{data: data})
    else
      _ -> {:error, :bad_request}
    end
  end
end
