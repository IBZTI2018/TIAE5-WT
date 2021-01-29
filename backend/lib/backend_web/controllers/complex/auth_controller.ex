defmodule BackendWeb.AuthController do
  use BackendWeb, :controller

  alias Backend.Database

  action_fallback(BackendWeb.FallbackController)

  def sign_up(conn, _args) do
    # Create new user account with hashed password
    send_resp(conn, 200, "OK")
  end

  def sign_in(conn, args) do
    with {:ok, usermail} <- Map.fetch(args, "usermail"),
         {:ok, password} <- Map.fetch(args, "password") do
      sign_in_user(conn, usermail, password)
    else
      :error -> :bad_request
    end
  end

  defp sign_in_user(conn, usermail, password) do
    case Database.get_user_by_mail(usermail) do
      nil ->
        :unauthorized

      user ->
        if Pbkdf2.verify_pass(password, user.password) do
          token = Phoenix.Token.sign(BackendWeb.Endpoint, "user_auth", user.id)

          conn
          |> put_status(200)
          |> json(%{data: %{token: token}})
        else
          :unauthorized
        end
    end
  end
end
