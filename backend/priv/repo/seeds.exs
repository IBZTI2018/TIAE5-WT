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

Backend.Repo.insert!(%Backend.Schema.Title{
  description: "Herr"
})

Backend.Repo.insert!(%Backend.Schema.Title{
  description: "Frau"
})

Backend.Repo.insert!(%Backend.Schema.Title{
  description: "Kampfhubschrauber"
})

country =
  Backend.Repo.insert!(%Backend.Schema.Country{
    isocode: "SUI",
    countryname: "Switzerland"
  })

Backend.Repo.insert!(%Backend.Schema.City{
  postcode: 8000,
  cityname: "Zürich",
  country: country
})

Backend.Repo.insert!(%Backend.Schema.City{
  postcode: 8804,
  cityname: "Au ZH",
  country: country
})
