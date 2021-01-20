defmodule Backend.Schema.User do
  use Ecto.Schema

  import Ecto.Changeset

  alias Backend.Schema.User
  alias Backend.Schema.Title
  alias Backend.Schema.Address
  alias Backend.Schema.Hotel

  schema "users" do
    field(:firstname, :string)
    field(:lastname, :string)
    field(:email, :string)
    field(:password, :string)

    has_one(:title, Title)
    has_one(:contact_address, Address)
    has_one(:billing_address, Address)

    many_to_many(:hotels, Hotel, join_through: "hotel_staffusers")
  end

  def changeset(%Address{} = address, attrs) do
    address
    |> cast(attrs, [:firstname, :lastname, :email, :password])
    |> cast_assoc(:title)
    |> cast_assoc(:contact_address)
    |> cast_assoc(:billing_address)
    |> validate_required([:firstname, :lastname, :email, :password, :title, :contact_address])
    |> validate_length(:firstname, min: 3, max: 255)
    |> validate_length(:lastname, min: 3, max: 255)
    |> validate_length(:email, min: 3, max: 50)
  end
end
