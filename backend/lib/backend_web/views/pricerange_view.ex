defmodule BackendWeb.PricerangeView do
  use JSONAPI.View, type: "priceranges"

  def fields do
    [:description]
  end
end
