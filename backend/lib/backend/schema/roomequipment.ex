defmodule Backend.Schema.Roomequipment do
  use Ecto.Schema

  import Ecto.Changeset

  alias Backend.Schema.Roomequipment
  alias Backend.Schema.Hotelroom

  schema "roomequipments" do
    field(:description, :string)

    many_to_many(:hotelrooms, Hotelroom, join_through: "hotelroom_roomequipments")
  end

  def changeset(%Roomequipment{} = roomequipment, attrs) do
    roomequipment
    |> cast(attrs, [:description])
    |> validate_required([:description])
    |> validate_length(:description, min: 3, max: 255)
  end
end
