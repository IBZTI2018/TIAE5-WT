defmodule Backend.Database do
  alias Backend.Repo

  import Ecto.Query, warn: false
  import Ecto.Changeset

  def select_all(schema) do
    Repo.all(schema)
  end

  def list_cities do
    Backend.Schema.City
    |> Repo.all()
    |> Repo.preload(:country)
  end
end
