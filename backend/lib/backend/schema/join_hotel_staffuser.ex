defmodule Backend.Schema.JoinHotelStaff do
  use Ecto.Schema

  import Ecto.Changeset

  alias Backend.Schema.JoinHotelStaff
  alias Backend.Schema.Hotel
  alias Backend.Schema.User

  schema "hotel_staffusers" do
    belongs_to(:hotel, Hotel)
    belongs_to(:user, User)
  end

  def changeset(%JoinHotelStaff{} = staff, attrs) do
    staff
    |> cast_assoc(:hotel)
    |> cast_assoc(:user)
    |> validate_required([:hotel, :user])
  end
end
