defmodule BackendWeb.ReservationView do
  use JSONAPI.View, type: "reservations"

  alias BackendWeb.OfferView
  alias BackendWeb.UserView

  def fields do
    [:checkin, :checkout, :paid]
  end

  def relationships do
    [
      offer: {OfferView, :include},
      user: {UserView, :include}
    ]
  end
end
