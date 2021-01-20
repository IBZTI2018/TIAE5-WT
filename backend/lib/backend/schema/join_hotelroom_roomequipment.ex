defmodule Backend.Schema.JoinHotelroomRoomequipment do
  use Ecto.Schema

  import Ecto.Changeset

  alias Backend.Schema.JoinHotelroomRoomequipment
  alias Backend.Schema.Hotelroom
  alias Backend.Schema.Roomequipment

  schema "hotelroom_roomequipments" do
    belongs_to(:hotelroom, Hotelroom, primary_key: true)
    belongs_to(:roomequipment, Roomequipment, primary_key: true)
  end

  def changeset(%JoinHotelroomRoomequipment{} = relation, attrs) do
    relation
    |> cast_assoc(:hotelroom)
    |> cast_assoc(:roomequipment)
    |> validate_required([:hotelroom, :roomequipment])
  end
end
