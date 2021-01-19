defmodule Backend.Schema.Title do
  use Ecto.Schema

  schema "titles" do
    field(:description, :string)
  end
end
