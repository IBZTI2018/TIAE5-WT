defmodule Backend.Schema.Offer do
  use Ecto.Schema

  import Ecto.Changeset

  alias Backend.Schema.Offer
  alias Backend.Schema.Hotelroom
  alias Backend.Schema.Reservation

  schema "offers" do
    field(:validitystart, :date)
    field(:validityend, :date)
    field(:price, :decimal)
    field(:booked, :boolean, default: false)

    belongs_to(:hotelroom, Hotelroom)

    has_many(:reservations, Reservation)
  end

  def changeset(%Offer{} = offer, attrs) do
    offer
    |> cast(attrs, [:validitystart, :validityend, :price, :booked, :hotelroom_id])
    |> validate_required([:validitystart, :validityend, :price, :hotelroom_id])
    |> validate_number(:price, greater_than_or_equal_to: 0)
  end
end
