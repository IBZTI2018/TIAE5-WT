defmodule BackendWeb.FallbackController do
  use Phoenix.Controller

  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> json(%{errors: [%{title: "Not Found"}]})
  end

  def call(conn, {:error, :unauthorized}) do
    conn
    |> put_status(:unauthorized)
    |> json(%{errors: [%{title: "Unauthorized"}]})
  end

  def call(conn, {:error, :forbidden}) do
    conn
    |> put_status(:forbidden)
    |> json(%{errors: [%{title: "Forbidden"}]})
  end

  def call(conn, _) do
    conn
    |> put_status(500)
    |> json(%{errors: [%{title: "Internal Server Error"}]})
  end
end
