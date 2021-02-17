defmodule BackendWeb.ReservationView do
  use JSONAPI.View, type: "reservations"

  alias BackendWeb.OfferView
  alias BackendWeb.UserView
  alias BackendWeb.RatingView

  def fields do
    [:checkin, :checkout, :paid]
  end

  def relationships do
    [
      offer: {OfferView, :include},
      user: {UserView, :include},
      rating: {RatingView, :include}
    ]
  end
end
