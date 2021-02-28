defmodule BackendWeb.StatsController do
  @moduledoc """
  Generate statistics comprehensively
  """
  use BackendWeb, :controller

  alias Backend.Database
  alias Backend.Schema.Hotel

  plug(BackendWeb.Plugs.Authorizer when action in [:get_hotel_stats])

  action_fallback(BackendWeb.FallbackController)

  @count_rooms_offered """
    SELECT COUNT(*) AS offer FROM offers
      JOIN hotelrooms ON hotelrooms.id = offers.hotelroom_id
      WHERE validityend >= CURDATE()
      AND hotel_id = $1
  """

  @count_rooms_booked """
    SELECT COUNT(*) AS reservation FROM reservations
      JOIN offers ON offers.id = reservations.offer_id
      JOIN hotelrooms ON hotelrooms.id = offers.hotelroom_id
      WHERE validityend >= CURDATE()
        AND hotel_id = $1
        AND offer_id = $1
  """

  @count_bookings_total """
    SELECT COUNT(*) FROM reservations r
      INNER JOIN offers o ON r.offer_id = o.id
      INNER JOIN hotelrooms h ON o.hotelroom_id = h.id
      WHERE h.hotel_id = $1;
  """

  @count_bookins_month """
  SELECT COUNT(*) FROM reservations r
    INNER JOIN offers o ON r.offer_id = o.id
    INNER JOIN hotelrooms h ON o.hotelroom_id = h.id
    WHERE h.hotel_id = $1
      AND checkout > DATE_SUB(NOW(), INTERVAL $2 MONTH)
      AND checkout < DATE_SUB(NOW(), INTERVAL $3 MONTH)
  """

  @count_reviews """
    SELECT COUNT(*) FROM ratings
      WHERE hotel_id = $1
  """

  @count_reviews_bad """
    SELECT COUNT(*) FROM ratings
      WHERE hotel_id = 1
        AND score < 3
  """

  def get_hotel_stats(conn, args) do
    case Database.generic_item(Hotel, args["id"]) do
      nil -> {:error, :not_found}
      hotel -> get_hotel_statistics(conn, hotel)
    end
  end

  defp get_hotel_statistics(conn, h) do
    [[total_reservations]] = q(@count_bookings_total, h.id)

    [[rooms_offered]] = q(@count_rooms_offered, h.id)
    [[rooms_booked]] = q(@count_rooms_booked, h.id)
    rooms_free = rooms_offered - rooms_booked

    [[total_ratings]] = q(@count_reviews, h.id)
    [[bad_ratings]] = q(@count_reviews_bad, h.id)
    good_ratings = total_ratings - bad_ratings

    json(conn, %{
      "data" => %{
        # Number of rooms for hotel, including currently occupied and currently free ones
        "rooms" => %{
          "total" => rooms_offered,
          "occupied" => rooms_booked,
          "free" => rooms_free
        },

        # Number of reservations for hotel in total and in the last n-1, n-2, etc. month
        "reservations" => %{
          "total" => total_reservations,
          "months" => Enum.map(11..0, &qd(@count_bookins_month, h.id, &1 + 1, &1))
        },

        # Ratings for the hotel
        "ratings" => %{
          "total" => total_ratings,
          "positive" => good_ratings,
          "negative" => bad_ratings
        }

        # TODO: Advanced statistic features as requested by potential customers
        #
        # # Rooms that have not been offered in a specific timeframe
        # "unoffered" => %{
        #   "last3months" => [],
        #   "last6months" => ["junior suite"]
        # },
        # # Rooms that have not been booked in a specific timeframe
        # "unbooked" => %{
        #   "last3months" => [],
        #   "last6months" => ["junior suite"]
        # }
      }
    })
  end

  defp q(query, id) do
    full_query =
      query
      |> prepare_query()
      |> String.replace("$1", "#{id}")

    {:ok, %MyXQL.Result{rows: r}} = Ecto.Adapters.SQL.query(Backend.Repo, full_query)
    r
  end

  defp qd(query, id, two, three) do
    full_query =
      query
      |> prepare_query()
      |> String.replace("$1", "#{id}")
      |> String.replace("$2", "#{two}")
      |> String.replace("$3", "#{three}")

    {:ok, %MyXQL.Result{rows: r}} = Ecto.Adapters.SQL.query(Backend.Repo, full_query)
    r
  end

  defp prepare_query(query), do: query |> String.replace("\n", "") |> String.trim()
end
