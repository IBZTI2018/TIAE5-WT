defmodule Backend.Schema.Hotel do
  use Ecto.Schema

  import Ecto.Changeset

  alias Backend.Schema.Hotel
  alias Backend.Schema.Address
  alias Backend.Schema.User
  alias Backend.Schema.Hotelequipment

  schema "hoteles" do
    field(:hotelname, :integer)

    belongs_to(:address, Address)

    many_to_many(:staff, User, join_through: "hotel_staffusers")
    many_to_many(:hotelequipment, Hotelequipment, join_through: "hotel_hotelequipments")
  end

  def changeset(%Hotel{} = hotel, attrs) do
    hotel
    |> cast(attrs, [:hotelname])
    |> cast_assoc(:address)
    |> validate_required([:hotelname, :address])
  end
end
