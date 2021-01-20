defmodule BackendWeb.RoomequipmentView do
  use JSONAPI.View, type: "roomequipments"

  def fields do
    [:description]
  end
end
