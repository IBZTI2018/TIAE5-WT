defmodule Backend.Repo.Migrations.AddBasicTables do
  use Ecto.Migration

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
      add(:country_id, references("countries"), null: false)
    end

    create table("streets") do
      add(:streetname, :string, null: false)
      add(:city_id, references("cities"), null: false)
    end

    create table("addresses") do
      add(:housenumber, :integer, null: false)
      add(:active, :boolean, null: false, default: true)
      add(:street_id, references("streets"), null: false)
    end

    create table("users") do
      add(:firstname, :string, null: false)
      add(:lastname, :string, null: false)
      add(:email, :string, null: false, size: 50)
      add(:password, :string, null: false)
      add(:contact_address_id, references("addresses"), null: false)
      add(:billing_address_id, references("addresses"), null: true)
      add(:title_id, references("titles"), null: false)
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

    create table("hotels") do
      add(:hotelname, :string, null: false)
      add(:address_id, references("addresses"), null: false)
    end

    create table("hotelrooms") do
      add(:roomname, :string, null: true)
      add(:roomnumber, :integer, null: false)
      add(:pricerange_id, references("priceranges"), null: false)
      add(:hotel_id, references("hotels"), null: false)
    end

    # Omit primary_key: false in create table for kaffy
    create table("hotel_staffusers") do
      add(:hotel_id, references("hotels"), null: false, primary_key: true)
      add(:user_id, references("users"), null: false, primary_key: true)
    end

    # Omit primary_key: false in create table for kaffy
    create table("hotel_hotelequipments") do
      add(:hotel_id, references("hotels"), null: false, primary_key: true)
      add(:hotelequipment_id, references("hotelequipments"), null: false, primary_key: true)
    end

    # Omit primary_key: false in create table for kaffy
    create table("hotelroom_roomequipments") do
      add(:hotelroom_id, references("hotelrooms"), null: false, primary_key: true)
      add(:roomequipment_id, references("roomequipments"), null: false, primary_key: true)
    end

    create table("offers") do
      add(:validitystart, :date, null: false)
      add(:validityend, :date, null: false)
      add(:price, :decimal, null: false)
      add(:hotelroom_id, references("hotelrooms"), null: false)
    end

    create table("reservations") do
      add(:checkin, :date, null: true)
      add(:checkout, :date, null: true)
      add(:paid, :boolean, null: false, default: false)
      add(:offer_id, references("offers"), null: false)
      add(:user_id, references("users"), null: false)
    end

    create table("rating") do
      add(:score, :float, null: false)
      add(:comment, :string, null: true)
      add(:anonymous, :boolean, null: false, default: false)
      add(:published, :boolean, null: false, default: false)
      add(:reservation_id, references("reservations"), null: false)
    end

    create table("medias") do
      add(:contents, :text, null: false)
      add(:reservation_id, references("reservations"), null: true)
      add(:offer_id, references("offers"), null: true)
    end
  end
end
