defmodule Backend.Schema.Country do
  use Ecto.Schema

  schema "countries" do
    field(:isocode, :string)
    field(:countryname, :string)
  end
end
