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

# We insert one country for the moment
switzerland =
  Backend.Repo.insert!(%Backend.Schema.Country{
    isocode: "SUI",
    countryname: "Switzerland"
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

# We insert one admin user
Backend.Repo.insert!(%Backend.Schema.User{
  firstname: "IBZ",
  lastname: "Admin",
  email: "admin@admin.ch",
  password: Pbkdf2.hash_pwd_salt("password"),
  title: Enum.at(titles, 1),
  contact_address: address,
  billing_address: address
})

# ---
# Dynamic seed data
# ---

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

now = Date.utc_today()

# We generate 10 hotels with each having 3 rooms on offer
for i <- 1..10 do
  hotel =
    Backend.Repo.insert!(%Backend.Schema.Hotel{
      hotelname: Faker.Beer.name(),
      address: random_address.()
    })

  for j <- 1..3 do
    hotelroom =
      Backend.Repo.insert!(%Backend.Schema.Hotelroom{
        roomname: Faker.Pokemon.name(),
        roomnumber: Enum.random(0..100) + i + j,
        hotel: hotel,
        pricerange: Enum.random(priceranges)
      })

    Backend.Repo.insert!(%Backend.Schema.Offer{
      hotelroom: hotelroom,
      validitystart: now,
      validityend: Date.add(now, Enum.random(0..100)),
      price: Enum.random(75..500)
    })
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
