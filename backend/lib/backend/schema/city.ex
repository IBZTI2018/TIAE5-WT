defmodule Backend.Schema.City do
  use Ecto.Schema

  import Ecto.Changeset

  alias Backend.Schema.City
  alias Backend.Schema.Country

  schema "cities" do
    field(:postcode, :integer)
    field(:cityname, :string)

    belongs_to(:country, Country)
  end

  def changeset(%City{} = city, attrs) do
    city
    |> cast(attrs, [:postcode, :cityname])
    |> validate_required([:postcode, :cityname])
    |> validate_length(:cityname, min: 3, max: 255)
  end
end
