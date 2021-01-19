defmodule Backend.Database do
  alias Backend.Repo

  import Ecto.Query, warn: false

  @default_params %JSONAPI.Config{}

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

  @doc """
  Get a generic single entry from the database by id.
  """
  def generic_item(schema, id, params) do
    schema
    |> where(id: ^id)
    |> apply_preloads(params.include)
    |> Repo.one!()
  end

  @doc """
  Create a generic item using JSON-API format JSON body payload
  """
  def generic_create(schema, body) do
    attrs = get_attributes_from(body)

    struct(schema)
    |> schema.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Delete a generic single entry from the database by id.
  """
  def generic_delete(schema, id) do
    schema
    |> generic_item(id, @default_params)
    |> Repo.delete()
  end

  defp apply_filter(query, []), do: query
  defp apply_filter(query, filter), do: query |> where(^filter)

  defp apply_sort(query, []), do: query
  defp apply_sort(query, sorts), do: query |> order_by(^sorts)

  defp apply_preloads(query, []), do: query
  defp apply_preloads(query, includes), do: query |> preload(^includes)

  defp get_attributes_from(body) do
    data = Map.get(body, "data", %{})
    attrs = Map.get(data, "attributes", %{})
    rels = Map.get(data, "relationships", %{})

    full_attrs =
      rels
      |> Enum.filter(&relationship_has_data/1)
      |> Enum.into(attrs, &relationship_data_id/1)

    full_attrs
  end

  defp relationship_has_data({_k, v}), do: Map.get(v, "data") != nil

  defp relationship_data_id({k, v}) do
    case Map.fetch(v, "data") do
      {:ok, content} ->
        fetched_id = Map.get(content, "id")
        {parsed_id, _overflow} = Integer.parse(fetched_id)
        {"#{k}_id", parsed_id}

      _ ->
        nil
    end
  end
end
