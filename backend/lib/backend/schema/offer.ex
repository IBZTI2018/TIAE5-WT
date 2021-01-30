defmodule Backend.Schema.Offer do
  use Ecto.Schema

  import Ecto.Changeset

  alias Backend.Schema.Offer
  alias Backend.Schema.Hotelroom

  schema "offers" do
    field(:validitystart, :date)
    field(:validityend, :date)
    field(:price, :decimal)

    belongs_to(:hotelroom, Hotelroom)
  end

  def changeset(%Offer{} = offer, attrs) do
    offer
    |> cast(attrs, [:validitystart, :validityend, :price, :hotelroom_id])
    |> validate_required([:validitystart, :validityend, :price, :hotelroom_id])
  end
end
