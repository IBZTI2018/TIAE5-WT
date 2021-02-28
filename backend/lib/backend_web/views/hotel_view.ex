defmodule BackendWeb.HotelView do
  use JSONAPI.View, type: "hotels"

  alias BackendWeb.AddressView
  alias BackendWeb.UserView
  alias BackendWeb.HotelequipmentView
  alias BackendWeb.HotelcategoryView
  alias BackendWeb.HotelroomView
  alias BackendWeb.RatingView

  def fields do
    [:hotelname, :image, :description, :rating, :can_manage]
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

  def can_manage(data, conn) do
    "#{data.id}" in Enum.map(conn.assigns.managed_hotels, &"#{&1}")
  end

  def relationships do
    [
      address: {AddressView, :include},
      staff: {UserView, :include},
      hotelcategory: {HotelcategoryView, :include},
      hotelequipments: {HotelequipmentView, :include},
      hotelrooms: {HotelroomView, :include},
      ratings: {RatingView, :include}
    ]
  end
end
