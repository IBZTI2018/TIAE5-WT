defmodule BackendWeb.HotelView do
  use JSONAPI.View, type: "hotels"

  alias BackendWeb.AddressView
  alias BackendWeb.UserView
  alias BackendWeb.HotelequipmentView

  def fields do
    [:hotelname, :image, :rating]
  end

  def rating(data, _conn) do
    # This causes N+1 queries
    # TODO: Force-preload ratings for hotel listings

    scores =
      data
      |> Backend.Repo.preload(:ratings)
      |> Map.get(:ratings)
      |> Enum.map(& &1.score)

    Enum.sum(scores) / Enum.count(scores)
  end

  def relationships do
    [
      address: {AddressView, :include},
      staff: {UserView, :include},
      hotelequipment: {HotelequipmentView, :include}
    ]
  end
end
