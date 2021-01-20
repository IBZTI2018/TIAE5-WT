defmodule Backend.Schema.JoinHotelHotelequipment do
  use Ecto.Schema

  import Ecto.Changeset

  alias Backend.Schema.JoinHotelHotelequipment
  alias Backend.Schema.Hotel
  alias Backend.Schema.Hotelequipment

  schema "hotel_hotelequipments" do
    belongs_to(:hotel, Hotel, primary_key: true)
    belongs_to(:hotelequipment, Hotelequipment, primary_key: true)
  end

  def changeset(%JoinHotelHotelequipment{} = relation, attrs) do
    relation
    |> cast_assoc(:hotel)
    |> cast_assoc(:hotelequipment)
    |> validate_required([:hotel, :hotelequipment])
  end
end
