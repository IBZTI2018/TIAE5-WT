defmodule BackendWeb.TitleView do
  use JSONAPI.View, type: "titles"

  def fields do
    [:description]
  end
end
