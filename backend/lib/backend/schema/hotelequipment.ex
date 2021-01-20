defmodule Backend.Schema.Hotelequipment do
  use Ecto.Schema

  import Ecto.Changeset

  alias Backend.Schema.Hotelequipment
  alias Backend.Schema.Hotel

  schema "hotelequipments" do
    field(:description, :string)

    many_to_many(:hotels, Hotel, join_through: "hotel_hotelequipments")
  end

  def changeset(%Hotelequipment{} = hotelequipment, attrs) do
    hotelequipment
    |> cast(attrs, [:description])
    |> validate_required([:description])
    |> validate_length(:description, min: 3, max: 255)
  end
end
