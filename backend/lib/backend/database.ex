defmodule Backend.Database do
  alias Backend.Repo

  import Ecto.Query, warn: false
  import Ecto.Changeset

  @doc """
  Get a generic list of a ressource and apply all common JSON-API query params.
  This does not currently support pagination due to the scope of the project.
  """
  def generic_list(schema, params) do
    schema
    |> apply_filter(params.filter)
    |> apply_sort(params.sort)
    |> apply_preloads(params.include)
    |> Repo.all()
  end

  defp apply_filter(query, []), do: query
  defp apply_filter(query, filter), do: query |> where(^filter)

  defp apply_sort(query, []), do: query
  defp apply_sort(query, sorts), do: query |> order_by(^sorts)

  defp apply_preloads(query, []), do: query
  defp apply_preloads(query, includes), do: query |> preload(^includes)
end
