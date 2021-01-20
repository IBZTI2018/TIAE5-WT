defmodule Backend.Schema.JoinHotelroomRoomequipment do
  use Ecto.Schema

  import Ecto.Changeset

  alias Backend.Schema.JoinHotelroomRoomequipment
  alias Backend.Schema.Hotelroom
  alias Backend.Schema.Roomequipment

  schema "hotelroom_roomequipments" do
    belongs_to(:hotelroom, Hotelroom)
    belongs_to(:roomequipment, Roomequipment)
  end

  def changeset(%JoinHotelroomRoomequipment{} = staff, attrs) do
    staff
    |> cast_assoc(:hotelroom)
    |> cast_assoc(:roomequipment)
    |> validate_required([:hotelroom, :roomequipment])
  end
end
