defmodule BackendWeb.Plugs.Authorizer do
  import Plug.Conn

  alias Backend.Database
  alias Backend.Schema.User

  def init(default), do: default

  def call(conn, _args) do
    case get_req_header(conn, "authorization") do
      [] -> no_auth_info(conn)
      [header] -> token_auth_info(conn, header)
    end
  end

  defp no_auth_info(conn) do
    conn
    |> assign(:logged_in, false)
    |> assign(:user, nil)
  end

  defp token_auth_info(conn, header) do
    try do
      <<"Bearer ", token::binary>> = header

      case Phoenix.Token.verify(BackendWeb.Endpoint, "user_auth", token) do
        {:ok, user_id} -> user_auth_info(conn, user_id)
        _ -> no_auth_info(conn)
      end
    rescue
      _ -> no_auth_info(conn)
    end
  end

  defp user_auth_info(conn, user_id) do
    case Database.generic_item(User, user_id, %JSONAPI.Config{}) do
      nil ->
        no_auth_info(conn)

      user ->
        conn
        |> assign(:logged_in, true)
        |> assign(:user, user)
        |> assign_hotel_info()
    end
  end

  defp assign_hotel_info(conn) do
    if conn.assigns.user.is_manager do
      hotels = conn.assigns.user |> Database.get_hotels_for_user() |> Enum.map(& &1.hotel)
      assign(conn, :managed_hotels, Enum.map(hotels, & &1.id))
    else
      assign(conn, :managed_hotels, [])
    end
  end
end
