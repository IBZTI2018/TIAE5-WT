defmodule Backend.Schema.City do
  use Ecto.Schema

  alias Backend.Schema.Country

  schema "cities" do
    field(:postcode, :integer)
    field(:cityname, :string)

    belongs_to(:country, Country)
  end
end
