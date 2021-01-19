defmodule Backend.Repo.Migrations.AddBasicTables do
  use Ecto.Migration

  def change do
    create table("titles") do
      add(:description, :string)
    end

    create table("countries") do
      add(:isocode, :string)
      add(:countryname, :string)
    end

    create table("cities") do
      add(:postcode, :integer)
      add(:cityname, :string)
      add(:country_id, references("countries"))
    end

    # ...
  end
end
