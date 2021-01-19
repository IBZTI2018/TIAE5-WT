defmodule Backend.Schema.Title do
  use Ecto.Schema

  import Ecto.Changeset

  alias Backend.Schema.Title

  schema "titles" do
    field(:description, :string)
  end

  def changeset(%Title{} = title, attrs) do
    title
    |> cast(attrs, [:description])
    |> validate_required([:description])
    |> validate_length(:description, min: 3, max: 255)
  end
end
