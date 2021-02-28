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
    INNER JOIN hotel_hotelequipments hhe
      ON hhe.hotel_id = h.id
    INNER JOIN hotelcategories hc
      ON h.hotelcategory_id = hc.id
    INNER JOIN addresses a
      ON h.address_id = a.id
    INNER JOIN streets s
      ON a.street_id = s.id
    INNER JOIN cities c
      ON s.city_id = c.id
    WHERE
      (h.hotelname LIKE '%$1%' OR c.cityname LIKE '%$1%')
      AND
      (o.validitystart <= '$2' AND o.validityend <= '$3' AND o.validityend >= '$2')
      AND
      (hr.persons = $4)
      AND
      (o.booked = 0)
    ;
  """

  def search_hotels(conn, %{"query" => query} = request_params) do
    validitystart = DateTime.utc_now() |> Date.to_string()
    validityend = DateTime.utc_now() |> Date.add(365) |> Date.to_string()

    default_params = %{
      "validitystart" => validitystart,
      "validityend" => validityend,
      "persons" => 1
    }

    params = Map.merge(default_params, request_params)

    with secure_string <- escape_string(query),
         secure_validitystart <- escape_string(params["validitystart"]),
         secure_validityend <- escape_string(params["validityend"]),
         secure_persons <- escape_string("#{params["persons"]}"),
         secure_query <- insert_param(@search_query, "$1", secure_string),
         secure_query <- insert_param(secure_query, "$2", secure_validitystart),
         secure_query <- insert_param(secure_query, "$3", secure_validityend),
         secure_query <- insert_param(secure_query, "$4", secure_persons),
         {:ok, %MyXQL.Result{rows: r}} <- Ecto.Adapters.SQL.query(Backend.Repo, secure_query),
         offer_ids <- Enum.map(r, fn [x] -> x end) do
      data = Database.get_offers_list(offer_ids)
      render(conn, BackendWeb.OfferView, "index.json", %{data: data})
    else
      _ -> {:error, :bad_request}
    end
  end

  defp escape_string(str), do: String.replace(str, @invalid_search_chars, "%")
  defp insert_param(query, param, value), do: String.replace(query, param, value)
end
