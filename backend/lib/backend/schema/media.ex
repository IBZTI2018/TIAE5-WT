defmodule Backend.Schema.Media do
  use Ecto.Schema

  import Ecto.Changeset

  alias Backend.Schema.Media
  alias Backend.Schema.Offer
  alias Backend.Schema.Reservation

  schema "medias" do
    field(:contents, :string)

    belongs_to(:offer, Offer)
    belongs_to(:reservation, Reservation)
  end

  def changeset(%Media{} = offer, attrs) do
    offer
    |> cast(attrs, [:contents])
    |> cast_assoc(:offer)
    |> cast_assoc(:reservation)
    |> validate_required([:contents])
  end
end
