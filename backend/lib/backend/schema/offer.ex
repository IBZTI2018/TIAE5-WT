defmodule Backend.Schema.Offer do
  use Ecto.Schema

  import Ecto.Changeset

  alias Backend.Schema.Offer
  alias Backend.Schema.Hotelroom

  schema "offers" do
    field(:validitystart, :date)
    field(:validityend, :date)

    belongs_to(:hotelroom, Hotelroom)
  end

  def changeset(%Offer{} = offer, attrs) do
    offer
    |> cast(attrs, [:validitystart, :validityend])
    |> cast_assoc(:hotelroom)
    |> validate_required([:validitystart, :validityend, :hotelroom])
  end
end
