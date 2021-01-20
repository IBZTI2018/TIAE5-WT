defmodule Backend.Schema.Reservation do
  use Ecto.Schema

  import Ecto.Changeset

  alias Backend.Schema.Reservation
  alias Backend.Schema.Offer
  alias Backend.Schema.User

  schema "reservations" do
    field(:checkin, :date)
    field(:checkout, :date)
    field(:paid, :boolean)

    belongs_to(:offer, Offer)
    belongs_to(:user, User)
  end

  def changeset(%Reservation{} = reservation, attrs) do
    reservation
    |> cast(attrs, [:checkin, :checkout, :paid])
    |> cast_assoc(:offer)
    |> cast_assoc(:user)
    |> validate_required([:paid, :offer, :user])
  end
end
