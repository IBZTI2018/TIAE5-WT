defmodule BackendWeb.AuthController do
  use BackendWeb, :controller

  alias Backend.Database
  alias Backend.Schema.User

  action_fallback(BackendWeb.FallbackController)

  @doc """
  Endpoint for signing up at /api/complex/signup

  Expects the following JSON payload
  {
    "email": "admin@admin.ch",
    "password": "password",
    "cityname": "Zürich",
    "postcode": 8000,
    "streetname": "Langstrasse",
    "housenumber": 20,
    "country_id": 1,
    "title_id": 1,
    "firstname": "Sven",
    "lastname": "Gehring"
  }
  """
  def sign_up(conn, args) do
    with {:ok, city} <- Database.Address.get_city_transient(args),
         {:ok, street} <- Database.Address.get_street_transient(args, city.id),
         {:ok, address} <- Database.Address.get_address_transient(args, street.id),
         {:ok, password} <- Map.fetch(args, "password"),
         user_args <- Map.take(args, ["firstname", "lastname", "title_id", "email"]),
         user_args <- Map.put(user_args, "contact_address_id", address.id),
         user_args <- Map.put(user_args, "password", Pbkdf2.hash_pwd_salt(password)),
         {:ok, user} <- Database.generic_create(User, %{"data" => %{"attributes" => user_args}}) do
      sign_in_user(conn, user.email, password)
    end
  end

  @doc """
  Endpoint for signing in at /api/complex/signin

  Expects the following JSON payload
  {
    "usermail": "admin@admin.ch",
    "password": "password"
  }
  """
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
