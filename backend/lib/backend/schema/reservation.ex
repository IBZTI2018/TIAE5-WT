defmodule Backend.Schema.Reservation do
  use Ecto.Schema

  import Ecto.Changeset

  alias Backend.Schema.Reservation
  alias Backend.Schema.Offer
  alias Backend.Schema.User
  alias Backend.Schema.Rating

  schema "reservations" do
    field(:checkin, :date)
    field(:checkout, :date)
    field(:paid, :boolean)

    belongs_to(:offer, Offer)
    belongs_to(:user, User)
    has_one(:rating, Rating)
  end

  def changeset(%Reservation{} = reservation, attrs) do
    reservation
    |> cast(attrs, [:checkin, :checkout, :paid, :offer_id, :user_id])
    |> validate_required([:paid, :offer_id, :user_id])
  end
end
