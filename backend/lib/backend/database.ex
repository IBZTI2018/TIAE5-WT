defmodule Backend.Database do
  alias Backend.Repo

  import Ecto.Query, warn: false

  @default_params %JSONAPI.Config{}
  @invalid_search_chars ~r/[^0-9A-zÄÖÜäöüÉÈÀéèà]/

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
  Create a generic item using JSON-API formatted JSON body payload
  """
  def generic_create(schema, body) do
    attrs = get_attributes_from(schema, body)

    struct(schema)
    |> schema.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Update a generic item using JSON-API formatted JSON body payload
  """
  def generic_update(schema, id, body) do
    attrs = get_attributes_from(schema, body)

    schema
    |> generic_item(id, @default_params)
    |> schema.changeset(attrs)
    |> Repo.update()
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

  defp apply_filter(query, [{field, value} | tail]) do
    term = String.replace(value, @invalid_search_chars, "%")

    query
    |> where([x], like(field(x, ^field), ^term))
    |> apply_filter(tail)
  end

  defp apply_sort(query, []), do: query
  defp apply_sort(query, sorts), do: query |> order_by(^sorts)

  defp apply_preloads(query, []), do: query
  defp apply_preloads(query, includes), do: query |> preload(^includes)

  defp get_attributes_from(schema, body) do
    data = Map.get(body, "data", %{})
    attrs = Map.get(data, "attributes", %{})
    rels = Map.get(data, "relationships", %{})

    full_attrs =
      rels
      |> Enum.filter(&relationship_has_data/1)
      |> Enum.into(attrs, &relationship_with_data(schema, &1))

    full_attrs
  end

  defp relationship_has_data({_k, v}), do: Map.get(v, "data") != nil

  defp relationship_with_data(s, {k, v}), do: {"#{k}_id", parse_associated_entry(s, k, v)}

  defp parse_associated_entry(s, k, %{"data" => %{"id" => id}}),
    do: get_associated_entry(s, k, id)

  defp parse_associated_entry(_, _, _), do: nil

  defp get_associated_entry(_, _, nil), do: nil

  defp get_associated_entry(s, k, id) do
    with true <- k in schema_allowed_assocs(s),
         info <- schema_get_assoc(s, k),
         {:ok, rs} <- Map.fetch(info, :related) do
      fetch_associated_entry(rs, id)
    else
      _ -> nil
    end
  end

  defp fetch_associated_entry(rs, id) do
    entry =
      rs
      |> where(id: ^id)
      |> Repo.one()

    case entry do
      nil -> nil
      _ -> entry.id
    end
  end

  defp schema_allowed_assocs(s), do: s.__schema__(:associations) |> Enum.map(&"#{&1}")
  defp schema_get_assoc(s, k), do: s.__schema__(:association, :"#{k}")

  @doc """
  Get a single user from the database by his mail
  """
  def get_user_by_mail(usermail) do
    Backend.Schema.User
    |> where(email: ^usermail)
    |> Repo.one()
  end

  @doc """
  Update a user directly
  """
  def update_user(user, attrs) do
    user
    |> Backend.Schema.User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Get all hotels that a manager can manage
  """
  def get_hotels_for_user(user) do
    Backend.Schema.JoinHotelStaff
    |> where(user_id: ^user.id)
    |> preload(:hotel)
    |> Repo.all()
  end

  @doc """
  Get a list of offers
  """
  def get_offers_list(ids) do
    Backend.Schema.Offer
    |> where([o], o.id in ^ids)
    |> preload([{:hotelroom, :hotel}])
    |> Repo.all()
  end
end
