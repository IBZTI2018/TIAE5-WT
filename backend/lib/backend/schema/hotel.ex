defmodule Backend.Schema.Hotel do
  use Ecto.Schema

  import Ecto.Changeset

  alias Backend.Schema.Hotel
  alias Backend.Schema.Hotelroom
  alias Backend.Schema.Address
  alias Backend.Schema.User
  alias Backend.Schema.Hotelequipment
  alias Backend.Schema.Hotelcategory
  alias Backend.Schema.Rating

  schema "hotels" do
    field(:hotelname, :string)
    field(:image, :string)
    field(:description, :string)

    belongs_to(:address, Address)
    belongs_to(:hotelcategory, Hotelcategory)

    has_many(:hotelrooms, Hotelroom)
    has_many(:ratings, Rating)

    many_to_many(:staff, User, join_through: "hotel_staffusers")
    many_to_many(:hotelequipment, Hotelequipment, join_through: "hotel_hotelequipments")
  end

  def changeset(%Hotel{} = hotel, attrs) do
    hotel
    |> cast(attrs, [:hotelname, :image, :description, :address_id, :hotelcategory_id])
    |> validate_required([:hotelname, :image, :address_id, :hotelcategory_id])
  end
end
