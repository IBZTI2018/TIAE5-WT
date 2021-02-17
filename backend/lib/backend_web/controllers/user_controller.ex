defmodule BackendWeb.UserController do
  use BackendWeb, :controller

  alias Backend.Database
  alias Backend.Schema.User

  alias BackendWeb.UserView

  plug(JSONAPI.QueryParser,
    filter: ~w(firstname lastname email),
    sort: ~w(firstname lastname),
    view: UserView
  )

  action_fallback(BackendWeb.FallbackController)

  def index(conn, _args) do
    data = Database.generic_list(User, conn.assigns.jsonapi_query)
    render(conn, "index.json", %{data: data})
  end

  def show(conn, args) do
    # Only a logged in user may show his own user information
    with true <- conn.assigns.logged_in,
         true <- conn.assigns.user.id == args["id"] do
      data = Database.generic_item(User, args["id"], conn.assigns.jsonapi_query)
      render(conn, "show.json", %{data: data})
    else
      false -> {:error, :forbidden}
      error -> error
    end
  end

  def show_self(conn, _args) do
    with true <- conn.assigns.logged_in do
      data = Database.generic_item(User, conn.assigns.user.id, conn.assigns.jsonapi_query)
      render(conn, "show.json", %{data: data})
    else
      false -> {:error, :forbidden}
    end
  end

  # Unused, creating users is handled via complex/auth
  def create(conn, args) do
    with {:ok, data} <- Database.generic_create(User, args) do
      conn
      |> put_status(:created)
      |> render("show.json", %{data: data})
    end
  end

  def update(conn, args) do
    # Only a logged in user may update his own profile
    # The user must re-provide his current password correctly
    data = args["data"]
    attrs = data["attributes"]
    current_password = attrs["currentPassword"]

    new_attrs = Map.delete(attrs, "currentPassword")

    new_attrs =
      if new_attrs["password"] == nil || new_attrs["password"] == "" do
        Map.delete(new_attrs, "password")
      else
        Map.put(new_attrs, "password", Pbkdf2.hash_pwd_salt(new_attrs["password"]))
      end

    new_data = Map.put(data, "attributes", new_attrs)
    new_args = Map.put(args, "data", new_data)

    with true <- "#{conn.assigns.user.id}" == args["data"]["id"],
         true <- Pbkdf2.verify_pass(current_password, conn.assigns.user.password),
         {:ok, data} <- Database.generic_update(User, args["id"], new_args) do
      render(conn, "show.json", %{data: data})
    else
      false -> {:error, :forbidden}
      _ -> {:error, :bad_request}
    end
  end

  # Unused, deleting a user is currently no possible to improve customer numbers :)
  def delete(conn, args) do
    with {:ok, _} <- Database.generic_delete(User, args["id"]) do
      send_resp(conn, 200, "")
    end
  end
end
