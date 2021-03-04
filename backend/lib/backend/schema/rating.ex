defmodule Backend.Schema.Rating do
  use Ecto.Schema

  import Ecto.Changeset

  alias Backend.Schema.Hotel
  alias Backend.Schema.Rating
  alias Backend.Schema.Reservation

  schema "ratings" do
    field(:score, :float)
    field(:comment, :string)
    field(:anonymous, :boolean, default: false)
    field(:published, :boolean, default: false)

    belongs_to(:reservation, Reservation)
    belongs_to(:hotel, Hotel)
  end

  def changeset(%Rating{} = rating, attrs) do
    rating
    |> cast(attrs, [:score, :comment, :anonymous, :published, :reservation_id, :hotel_id])
    |> validate_required([:score, :anonymous, :published, :reservation_id, :hotel_id])
    |> validate_number(:score, greater_than_or_equal_to: 0)
  end
end
