defmodule Backend.Schema.JoinHotelStaff do
  use Ecto.Schema

  import Ecto.Changeset

  alias Backend.Schema.JoinHotelStaff
  alias Backend.Schema.Hotel
  alias Backend.Schema.User

  schema "hotel_staffusers" do
    belongs_to(:hotel, Hotel, primary_key: true)
    belongs_to(:user, User, primary_key: true)
  end

  def changeset(%JoinHotelStaff{} = relation, attrs) do
    relation
    |> cast_assoc(:hotel)
    |> cast_assoc(:user)
    |> validate_required([:hotel, :user])
  end
end
