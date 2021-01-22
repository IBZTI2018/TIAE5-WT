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

now = Date.utc_today()

# We insert some common titles
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

switzerland =
  Backend.Repo.insert!(%Backend.Schema.Country{
    isocode: "SUI",
    countryname: "Switzerland"
  })

# We generate 10 hotels with each having 3 rooms on offer
for i <- 1..10 do
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

  hotel =
    Backend.Repo.insert!(%Backend.Schema.Hotel{
      hotelname: Faker.Beer.name(),
      address: address
    })

  hotelroom =
    Backend.Repo.insert!(%Backend.Schema.Hotelroom{
      roomname: Faker.Pokemon.name(),
      roomnumber: Enum.random(0..100) + i,
      hotel: hotel,
      pricerange: Enum.random(priceranges)
    })

  Backend.Repo.insert!(%Backend.Schema.Offer{
    hotelroom: hotelroom,
    validitystart: now,
    validityend: Date.add(now, Enum.random(0..100))
  })
end
