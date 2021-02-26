defmodule BackendWeb.StatsController do
  @moduledoc """
  Generate statistics comprehensively
  """
  use BackendWeb, :controller

  alias Backend.Database
  alias Backend.Schema.Hotel

  # plug(BackendWeb.Plugs.Authorizer when action in [:get_hotel_stats])

  action_fallback(BackendWeb.FallbackController)

  @count_rooms "SELECT COUNT(*) FROM hotelrooms WHERE hotel_id = $1"

  def get_hotel_stats(conn, args) do
    case Database.generic_item(Hotel, args["id"]) do
      nil -> {:error, :not_found}
      hotel -> get_hotel_statistics(conn, hotel)
    end
  end

  defp get_hotel_statistics(conn, h) do
    [[total_rooms]] = q(@count_rooms, h.id)

    json(conn, %{
      "data" => %{
        # Number of rooms for hotel, including currently occupied and currently free ones
        "rooms" => %{
          "total" => total_rooms,
          "occupied" => 1,
          "free" => total_rooms - 1
        },
        # Number of reservations for hotel in total and in the last n-1, n-2, etc. month
        "reservations" => %{
          "total" => 78,
          "months" => [5, 2, 10, 4, 1, 6, 11, 8, 9, 3, 7, 12]
        },
        # Ratings for the hotel
        "ratings" => %{
          "total" => 5,
          "positive" => 3,
          "negative" => 2
        },
        # Rooms that have not been offered in a specific timeframe
        "unoffered" => %{
          "last3months" => [],
          "last6months" => ["junior suite"]
        },
        # Rooms that have not been booked in a specific timeframe
        "unbooked" => %{
          "last3months" => [],
          "last6months" => ["junior suite"]
        }
      }
    })
  end

  defp q(query, id) do
    full_query = String.replace(query, "$1", "#{id}")
    {:ok, %MyXQL.Result{rows: r}} = Ecto.Adapters.SQL.query(Backend.Repo, full_query)
    r
  end
end
