defmodule Backend.Database.Address do
  @moduledoc """
  Module for transient address manipulation
  """

  import Ecto.Query, warn: false

  alias Backend.Repo
  alias Backend.Schema.City
  alias Backend.Schema.Street
  alias Backend.Schema.Address

  def get_city_transient(%{"cityname" => cityname, "postcode" => postcode, "country_id" => cid}) do
    potential =
      City
      |> where(cityname: ^cityname)
      |> where(postcode: ^postcode)
      |> where(country_id: ^cid)
      |> Repo.all()

    case potential do
      [] ->
        %City{}
        |> City.changeset(%{
          cityname: cityname,
          postcode: postcode,
          country_id: cid
        })
        |> Repo.insert()

      [city] ->
        {:ok, city}
    end
  end

  def get_city_transient(_), do: {:error, :bad_request}

  def get_street_transient(%{"streetname" => streetname}, city_id) do
    potential =
      Street
      |> where(streetname: ^streetname)
      |> where(city_id: ^city_id)
      |> Repo.all()

    case potential do
      [] ->
        %Street{}
        |> Street.changeset(%{
          streetname: streetname,
          city_id: city_id
        })
        |> Repo.insert()

      [street] ->
        {:ok, street}
    end
  end

  def get_street_transient(_, _), do: {:error, :bad_request}

  def get_address_transient(%{"housenumber" => housenumber}, street_id) do
    potential =
      Address
      |> where(housenumber: ^housenumber)
      |> where(street_id: ^street_id)
      |> Repo.all()

    case potential do
      [] ->
        %Address{}
        |> Address.changeset(%{
          housenumber: housenumber,
          street_id: street_id
        })
        |> Repo.insert()

      [address] ->
        {:ok, address}
    end
  end

  def get_address_transient(_, _), do: {:error, :bad_request}
end
