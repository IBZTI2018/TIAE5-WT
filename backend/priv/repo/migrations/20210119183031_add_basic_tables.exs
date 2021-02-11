defmodule Backend.Repo.Migrations.AddBasicTables do
  use Ecto.Migration

  # Safe cascade should use `:nilify_all` on delete but the MySQL
  # adapter does not seem to support this at the moment!

  @simple_cascade [on_delete: :delete_all, on_update: :nothing]
  @safe_cascade [on_delete: :nothing, on_update: :nothing]

  def change do
    create table("titles") do
      add(:description, :string, null: false)
    end

    create table("countries") do
      add(:isocode, :string, null: false)
      add(:countryname, :string, null: false)
    end

    create table("cities") do
      add(:postcode, :integer, null: false)
      add(:cityname, :string, null: false)

      add(:country_id, references("countries", @simple_cascade), null: false)
    end

    create table("streets") do
      add(:streetname, :string, null: false)
      add(:city_id, references("cities", @simple_cascade), null: false)
    end

    create table("addresses") do
      add(:housenumber, :integer, null: false)
      add(:active, :boolean, null: false, default: true)
      add(:street_id, references("streets", @simple_cascade), null: false)
    end

    create table("users") do
      add(:firstname, :string, null: false)
      add(:lastname, :string, null: false)
      add(:email, :string, null: false, size: 50)
      add(:password, :string, null: false)
      add(:is_manager, :boolean, null: false, default: false)
      add(:contact_address_id, references("addresses"), null: false)
      add(:billing_address_id, references("addresses"), null: true)
      add(:title_id, references("titles", @safe_cascade), null: false)
    end

    create(unique_index("users", [:email]))

    create table("priceranges") do
      add(:description, :string, null: false)
    end

    create table("hotelequipments") do
      add(:description, :string, null: false)
    end

    create table("roomequipments") do
      add(:description, :string, null: false)
    end

    create table("hotelcategories") do
      add(:description, :string, null: false)
      add(:stars, :integer, null: false)
    end

    create table("hotels") do
      add(:hotelname, :string, null: false)
      add(:image, :string, null: false)
      add(:description, :string, null: true)
      add(:address_id, references("addresses"), null: false)
      add(:hotelcategory_id, references("hotelcategories", @safe_cascade), null: false)
    end

    create table("hotelrooms") do
      add(:roomname, :string, null: true)
      add(:roomnumber, :integer, null: false)
      add(:persons, :integer, null: false)
      add(:pricerange_id, references("priceranges", @safe_cascade), null: false)
      add(:hotel_id, references("hotels", @simple_cascade), null: false)
    end

    # Omit primary_key: false in create table for kaffy
    create table("hotel_staffusers") do
      add(:hotel_id, references("hotels", @simple_cascade), null: false, primary_key: true)
      add(:user_id, references("users", @simple_cascade), null: false, primary_key: true)
    end

    # Omit primary_key: false in create table for kaffy
    create table("hotel_hotelequipments") do
      add(:hotel_id, references("hotels", @simple_cascade), null: false, primary_key: true)

      add(:hotelequipment_id, references("hotelequipments", @simple_cascade),
        null: false,
        primary_key: true
      )
    end

    # Omit primary_key: false in create table for kaffy
    create table("hotelroom_roomequipments") do
      add(:hotelroom_id, references("hotelrooms", @simple_cascade), null: false, primary_key: true)

      add(:roomequipment_id, references("roomequipments", @simple_cascade),
        null: false,
        primary_key: true
      )
    end

    create table("offers") do
      add(:validitystart, :date, null: false)
      add(:validityend, :date, null: false)
      add(:price, :decimal, null: false)
      add(:hotelroom_id, references("hotelrooms", @simple_cascade), null: false)
    end

    create table("reservations") do
      add(:checkin, :date, null: true)
      add(:checkout, :date, null: true)
      add(:paid, :boolean, null: false, default: false)
      add(:offer_id, references("offers", @safe_cascade), null: false)
      add(:user_id, references("users", @simple_cascade), null: false)
    end

    create table("ratings") do
      add(:score, :float, null: false)
      add(:comment, :string, null: true)
      add(:anonymous, :boolean, null: false, default: false)
      add(:published, :boolean, null: false, default: false)
      add(:reservation_id, references("reservations", @safe_cascade), null: false)
      add(:hotel_id, references("hotels", @simple_cascade), null: false)
    end

    create table("medias") do
      add(:contents, :text, null: false)
      add(:reservation_id, references("reservations", @safe_cascade), null: true)
      add(:offer_id, references("offers", @safe_cascade), null: true)
    end
  end
end
