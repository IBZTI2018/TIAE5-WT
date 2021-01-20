defmodule Backend.Schema.Pricerange do
  use Ecto.Schema

  import Ecto.Changeset

  alias Backend.Schema.Pricerange

  schema "priceranges" do
    field(:description, :string)
  end

  def changeset(%Pricerange{} = pricerange, attrs) do
    pricerange
    |> cast(attrs, [:description])
    |> validate_required([:description])
    |> validate_length(:description, min: 3, max: 255)
  end
end
