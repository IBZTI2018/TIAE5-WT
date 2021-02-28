defmodule BackendWeb.ControllerHelpers do
  def can_manage_hotel(conn, hotel_id) do
    if "#{hotel_id}" in Enum.map(conn.assigns.managed_hotels, &"#{&1}") do
      :ok
    else
      {:error, :forbidden}
    end
  end

  def can_manage_hotel(conn, args, key),
    do: can_manage_hotel(conn, args["data"]["attributes"][key])
end
