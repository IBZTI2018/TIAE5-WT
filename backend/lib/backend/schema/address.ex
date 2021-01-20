defmodule Backend.Schema.Address do
  use Ecto.Schema

  import Ecto.Changeset

  alias Backend.Schema.Address
  alias Backend.Schema.Street

  schema "addresses" do
    field(:housenumber, :integer)
    field(:active, :boolean, default: true)

    belongs_to(:street, Street)
  end

  def changeset(%Address{} = address, attrs) do
    address
    |> cast(attrs, [:housenumber, :active, :street_id])
    |> validate_required([:housenumber, :active, :street_id])
  end
end
