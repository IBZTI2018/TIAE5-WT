defmodule Backend.Schema.Media do
  use Ecto.Schema

  import Ecto.Changeset

  alias Backend.Schema.Media
  alias Backend.Schema.Hotel

  schema "medias" do
    field(:contents, :binary)
    field(:sent, :boolean, default: false)

    belongs_to(:hotel, Hotel)
  end

  def changeset(%Media{} = media, attrs) do
    media
    |> cast(attrs, [:contents, :sent, :hotel_id])
    |> validate_required([:contents, :sent, :hotel_id])
  end
end
