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

    belongs_to(:title, Title)
    belongs_to(:contact_address, Address)
    belongs_to(:billing_address, Address)

    many_to_many(:hotels, Hotel, join_through: "hotel_staffusers")
  end

  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [
      :firstname,
      :lastname,
      :email,
      :password,
      :title_id,
      :contact_address_id,
      :billing_address_id
    ])
    |> validate_required([
      :firstname,
      :lastname,
      :email,
      :password,
      :title_id,
      :contact_address_id
    ])
    |> validate_length(:firstname, min: 3, max: 255)
    |> validate_length(:lastname, min: 3, max: 255)
    |> validate_length(:email, min: 3, max: 50)
  end
end
