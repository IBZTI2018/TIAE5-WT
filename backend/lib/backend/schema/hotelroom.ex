defmodule Backend.Schema.Hotelroom do
  use Ecto.Schema

  import Ecto.Changeset

  alias Backend.Schema.Hotelroom
  alias Backend.Schema.Hotel
  alias Backend.Schema.Pricerange
  alias Backend.Schema.Roomequipment

  schema "hotelrooms" do
    field(:roomname, :string)
    field(:roomnumber, :integer)

    belongs_to(:hotel, Hotel)
    belongs_to(:pricerange, Pricerange)

    many_to_many(:roomequipments, Roomequipment, join_through: "hotelroom_roomequipments")
  end

  def changeset(%Hotelroom{} = hotelroom, attrs) do
    hotelroom
    |> cast(attrs, [:roomname, :roomnumber])
    |> cast_assoc(:hotel)
    |> cast_assoc(:pricerange)
    |> validate_required([:roomnumber, :hotel, :pricerange])
  end
end
