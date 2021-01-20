defmodule Backend.Schema.Street do
  use Ecto.Schema

  import Ecto.Changeset

  alias Backend.Schema.Street
  alias Backend.Schema.City

  schema "streets" do
    field(:streetname, :string)

    belongs_to(:city, City)
  end

  def changeset(%Street{} = street, attrs) do
    street
    |> cast(attrs, [:streetname])
    |> cast_assoc(:city)
    |> validate_required([:streetname, :city])
    |> validate_length(:streetname, min: 3, max: 255)
  end
end
