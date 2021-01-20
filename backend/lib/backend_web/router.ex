defmodule BackendWeb.Router do
  use BackendWeb, :router

  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "/api", BackendWeb do
    pipe_through(:api)

    resources("/titles", TitleController, except: [:edit, :new])
    resources("/countries", CountryController, except: [:edit, :new])
    resources("/cities", CityController, except: [:edit, :new])
    resources("/streets", StreetController, except: [:edit, :new])
    resources("/addresses", AddressController, except: [:edit, :new])
    resources("/users", UserController, except: [:edit, :new])
    resources("/hotels", HotelController, except: [:edit, :new])
    resources("/hotelrooms", HotelroomController, except: [:edit, :new])
    resources("/priceranges", PricerangeController, except: [:edit, :new])
    resources("/hotelequipments", HotelequipmentController, except: [:edit, :new])
    resources("/roomequipments", RoomequipmentController, except: [:edit, :new])
    resources("/offers", OfferController, except: [:edit, :new])
    resources("/reservations", ReservationController, except: [:edit, :new])
    resources("/ratings", ReservationController, except: [:edit, :new])
  end

  # Enables LiveDashboard and Kaffy dashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through([:fetch_session, :protect_from_forgery])
      live_dashboard("/dashboard", metrics: BackendWeb.Telemetry)
    end

    use Kaffy.Routes, scope: "/admin"
  end
end
