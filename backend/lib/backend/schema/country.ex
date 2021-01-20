defmodule Backend.Schema.Country do
  use Ecto.Schema

  import Ecto.Changeset

  alias Backend.Schema.Country

  schema "countries" do
    field(:isocode, :string)
    field(:countryname, :string)
  end

  def changeset(%Country{} = country, attrs) do
    country
    |> cast(attrs, [:isocode, :countryname])
    |> validate_required([:isocode, :countryname])
    |> validate_length(:isocode, is: 3)
    |> validate_length(:countryname, min: 3, max: 255)
  end
end
