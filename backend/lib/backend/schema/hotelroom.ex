defmodule Backend.Schema.Hotelroom do
  use Ecto.Schema

  import Ecto.Changeset

  alias Backend.Schema.Hotelroom
  alias Backend.Schema.Hotel
  alias Backend.Schema.Pricerange
  alias Backend.Schema.Roomequipment
  alias Backend.Schema.Offer

  schema "hotelrooms" do
    field(:roomname, :string)
    field(:roomnumber, :integer)
    field(:persons, :integer)

    belongs_to(:hotel, Hotel)
    belongs_to(:pricerange, Pricerange)

    many_to_many(:roomequipments, Roomequipment, join_through: "hotelroom_roomequipments")
    has_many(:offers, Offer)
  end

  def changeset(%Hotelroom{} = hotelroom, attrs) do
    hotelroom
    |> cast(attrs, [:roomname, :roomnumber, :persons, :hotel_id, :pricerange_id])
    |> validate_required([:roomnumber, :persons, :hotel_id, :pricerange_id])
  end
end
