defmodule Backend.Schema.Rating do
  use Ecto.Schema

  import Ecto.Changeset

  alias Backend.Schema.Rating
  alias Backend.Schema.Reservation

  schema "ratings" do
    field(:score, :float)
    field(:comment, :string)
    field(:anonymous, :boolean, default: false)
    field(:published, :boolean, default: false)

    belongs_to(:reservation, Reservation)
  end

  def changeset(%Rating{} = offer, attrs) do
    offer
    |> cast(attrs, [:score, :comment, :anonymous, :published])
    |> cast_assoc(:reservation)
    |> validate_required([:score, :anonymous, :published, :reservation])
  end
end
