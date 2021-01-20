defmodule BackendWeb.RatingView do
  use JSONAPI.View, type: "ratings"

  alias BackendWeb.ReservationView

  def fields do
    [:score, :comment, :anonymous, :published]
  end

  def relationships do
    [
      reservation: {ReservationView, :include}
    ]
  end
end
