# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Backend.Repo.insert!(%Backend.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

# ---
# Static, predefined values
# ---

# We insert some common titles
titles =
  for desc <- ["Herr", "Frau", "Kampfhubschrauber"] do
    Backend.Repo.insert!(%Backend.Schema.Title{
      description: desc
    })
  end

# We insert some common hotel room price ranges
priceranges =
  for desc <- ["Günstig", "Mittelklasse", "Luxus"] do
    Backend.Repo.insert!(%Backend.Schema.Pricerange{
      description: desc
    })
  end

# We insert hotel categories for all common star classes
hotel_categories =
  for {desc, stars} <- [
        {"One Star", 1},
        {"Two Star", 2},
        {"Three Star", 3},
        {"Four Star", 4},
        {"Five Star", 5},
        {"Six Star", 6}
      ] do
    Backend.Repo.insert!(%Backend.Schema.Hotelcategory{
      description: desc,
      stars: stars
    })
  end

# We insert one country for the moment
switzerland =
  Backend.Repo.insert!(%Backend.Schema.Country{
    isocode: "SUI",
    countryname: "Switzerland"
  })

germany =
  Backend.Repo.insert!(%Backend.Schema.Country{
    isocode: "GER",
    countryname: "Germany"
  })

city =
  Backend.Repo.insert!(%Backend.Schema.City{
    postcode: 8800,
    cityname: "Zürich",
    country: switzerland
  })

street =
  Backend.Repo.insert!(%Backend.Schema.Street{
    streetname: "Bahnhofstrasse",
    city: city
  })

address =
  Backend.Repo.insert!(%Backend.Schema.Address{
    housenumber: 1,
    street: street
  })

city2 =
  Backend.Repo.insert!(%Backend.Schema.City{
    postcode: 10000,
    cityname: "Berlin",
    country: germany
  })

street2 =
  Backend.Repo.insert!(%Backend.Schema.Street{
    streetname: "Speergasse",
    city: city2
  })

address2 =
  Backend.Repo.insert!(%Backend.Schema.Address{
    housenumber: 2,
    street: street2
  })

# We insert one admin user
admin =
  Backend.Repo.insert!(%Backend.Schema.User{
    firstname: "IBZ",
    lastname: "Admin",
    email: "cbrxde+admin@gmail.com",
    password: Pbkdf2.hash_pwd_salt("password"),
    is_manager: true,
    title: Enum.at(titles, 1),
    contact_address: address,
    billing_address: nil
  })

staff =
  Backend.Repo.insert!(%Backend.Schema.User{
    firstname: "IBZ",
    lastname: "Manager",
    email: "cbrxde+manager@gmail.com",
    password: Pbkdf2.hash_pwd_salt("password"),
    is_manager: true,
    title: Enum.at(titles, 1),
    contact_address: address,
    billing_address: address2
  })

customer =
  Backend.Repo.insert!(%Backend.Schema.User{
    firstname: "IBZ",
    lastname: "Customer",
    email: "cbrxde+customer@gmail.com",
    password: Pbkdf2.hash_pwd_salt("password"),
    is_manager: false,
    title: Enum.at(titles, 2),
    contact_address: address,
    billing_address: nil
  })

# We insert some generic hotel extras
hotel_equipments =
  for e <- [
        "fitness center",
        "sauna",
        "wellness area",
        "entertainer",
        "free parking",
        "swimming pool",
        "wine bar",
        "cigar lounge"
      ] do
    Backend.Repo.insert!(%Backend.Schema.Hotelequipment{
      description: e
    })
  end

# We insert some generic room extras
room_equipments =
  for e <- [
        "mountain view",
        "sea view",
        "lake view",
        "queen size bed",
        "kind size bed",
        "upgraded minibar",
        "bathtub",
        "movie library",
        "luxury bathroom",
        "extra comfy pillows"
      ] do
    Backend.Repo.insert!(%Backend.Schema.Roomequipment{
      description: e
    })
  end

# ---
# Dynamic seed data
# ---

random_hotel_name = fn ->
  Enum.random([
    "White Chasm Hotel",
    "Secret Mantle Hotel",
    "Noble Beach Hotel",
    "Antique Estate Resort",
    "Olive Panorama Hotel",
    "Scarlet River Hotel",
    "Oceanview Resort & Spa",
    "Mirror Motel",
    "Antique Hotel & Spa",
    "Stratosphere Hotel & Spa",
    "Soft Elephant Hotel & Spa",
    "Glorious Treasure Motel",
    "Noble Brewery Hotel",
    "Saffron Bliss Hotel",
    "Malachite Cosmos Hotel & Spa",
    "Riverside Excalibur Hotel",
    "Globetrotter Resort",
    "Elysium Resort & Spa",
    "Nebula Hotel",
    "Cosmos Motel",
    "Glorious Horizon Hotel & Spa",
    "Noble Manor Hotel & Spa",
    "Brass Thicket Resort",
    "Majestic Estate Resort & Spa",
    "Modest Grove Resort",
    "Rose Brewery Hotel",
    "Blizzard Resort",
    "Fantasy Resort",
    "Wonderland Resort",
    "Everland Resort & Spa",
    "Secret Spa Hotel & Spa",
    "Lord's Seaside Resort",
    "Glorious Pier Hotel",
    "Summer Cosmos Hotel",
    "Ancient Woodland Hotel",
    "Summer Gem Hotel",
    "Exalted Hotel & Spa",
    "Fantasy Resort",
    "Curiosity Hotel",
    "Anomaly Hotel & Spa"
  ])
end

random_address = fn ->
  city =
    Backend.Repo.insert!(%Backend.Schema.City{
      postcode: Faker.Address.zip() |> String.to_integer(),
      cityname: Faker.Address.city(),
      country: switzerland
    })

  street =
    Backend.Repo.insert!(%Backend.Schema.Street{
      streetname: Faker.Address.street_name(),
      city: city
    })

  address =
    Backend.Repo.insert!(%Backend.Schema.Address{
      housenumber: Enum.random(0..100),
      street: street
    })

  address
end

maybe = fn ->
  Enum.random(0..1) != 0
end

now = Date.utc_today()

# We generate 10 hotels with each having 3 rooms on offer
for i <- 1..10 do
  hotel =
    Backend.Repo.insert!(%Backend.Schema.Hotel{
      hotelname: random_hotel_name.(),
      image: "https://placedog.net/640/480?id=#{i}",
      description: Faker.Lorem.paragraph(10),
      address: random_address.(),
      hotelcategory: Enum.random(hotel_categories)
    })

  # Hotels have a 50/50 chance to belong to our staff user
  if maybe.() do
    Backend.Repo.insert!(%Backend.Schema.JoinHotelStaff{
      hotel: hotel,
      user: staff
    })
  end

  # Rooms have randomly 1 - 4 extra equipments
  for k <- 0..Enum.random(1..4) do
    Backend.Repo.insert!(%Backend.Schema.JoinHotelHotelequipment{
      hotel: hotel,
      hotelequipment: Enum.at(hotel_equipments, k)
    })
  end

  for j <- 1..5 do
    hotelroom =
      Backend.Repo.insert!(%Backend.Schema.Hotelroom{
        roomname: Faker.Pokemon.name(),
        roomnumber: Enum.random(0..100) + i + j,
        persons: Enum.random(1..4),
        hotel: hotel,
        pricerange: Enum.random(priceranges)
      })

    # Rooms have randomly 1 - 4 extra equipments
    for k <- 0..Enum.random(1..4) do
      Backend.Repo.insert!(%Backend.Schema.JoinHotelroomRoomequipment{
        hotelroom: hotelroom,
        roomequipment: Enum.at(room_equipments, k)
      })
    end

    offer =
      Backend.Repo.insert!(%Backend.Schema.Offer{
        hotelroom: hotelroom,
        validitystart: now,
        validityend: Date.add(now, Enum.random(0..100)),
        price: Enum.random(75..500)
      })

    # Three out of five rooms have a reservation
    if j <= 3 do
      # Reservations have a chance to already have happened in the past
      {checkin, checkout} =
        if maybe.() do
          {now, Date.add(now, Enum.random(1..20))}
        else
          {now, Date.add(now, Enum.random(1..20) * -1)}
        end

      reservation =
        Backend.Repo.insert!(%Backend.Schema.Reservation{
          checkin: checkin,
          checkout: checkout,
          paid: maybe.(),
          offer: offer,
          user: customer
        })

      # Two out of three rooms are rated
      if j <= 2 do
        Backend.Repo.insert!(%Backend.Schema.Rating{
          score: Enum.random(0..5) / 1,
          comment: Faker.Lorem.paragraph(1),
          anonymous: maybe.(),
          published: maybe.(),
          reservation: reservation,
          hotel: hotel
        })
      end
    end
  end
end

# We generate 3 user accounts
for i <- 1..3 do
  Backend.Repo.insert!(%Backend.Schema.User{
    firstname: Faker.Person.first_name(),
    lastname: Faker.Person.last_name(),
    email: Faker.Internet.email(),
    password: Pbkdf2.hash_pwd_salt(Faker.Cat.name()),
    title: Enum.at(titles, 1),
    contact_address: random_address.(),
    billing_address: random_address.()
  })
end
