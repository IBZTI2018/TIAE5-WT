defmodule Backend.Schema.Hotelcategory do
  use Ecto.Schema

  import Ecto.Changeset

  alias Backend.Schema.Hotelcategory

  schema "hotelcategories" do
    field(:description, :string)
    field(:stars, :integer)
  end

  def changeset(%Hotelcategory{} = hotelcategory, attrs) do
    hotelcategory
    |> cast(attrs, [:description, :stars])
    |> validate_required([:description, :stars])
    |> validate_length(:description, min: 3, max: 255)
  end
end
