defmodule BackendWeb.Router do
  use BackendWeb, :router

  pipeline :api do
    plug(:accepts, ["json"])
  end

  pipeline :auth do
    plug(BackendWeb.Plugs.Authorizer)
  end

  scope "/api", BackendWeb do
    pipe_through(:api)

    scope "/v1" do
      pipe_through(:auth)

      # Ressources managed by admins via Kaffy Dashboard
      resources("/titles", TitleController, only: [:index, :show])
      resources("/countries", CountryController, only: [:index, :show])
      resources("/hotels", HotelController, only: [:index, :show])
      resources("/hotelequipments", HotelequipmentController, only: [:index, :show])
      resources("/roomequipments", RoomequipmentController, only: [:index, :show])
      resources("/priceranges", PricerangeController, only: [:index, :show])

      # Ressources managed by db wrapper internally
      resources("/cities", CityController, only: [:index, :show])
      resources("/streets", StreetController, only: [:index, :show])
      resources("/addresses", AddressController, only: [:index, :show])

      # Generic, full REST ressources with permission scope
      resources("/users", UserController, except: [:edit, :new, :index, :create, :delete])

      # TODO: Complete these - sven
      resources("/hotelrooms", HotelroomController, except: [:edit, :new])
      resources("/offers", OfferController, except: [:edit, :new])
      resources("/reservations", ReservationController, except: [:edit, :new])
      resources("/ratings", ReservationController, except: [:edit, :new])
    end

    scope "/complex" do
      post("/signup", AuthController, :sign_up)
      post("/signin", AuthController, :sign_in)
    end
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
      live_dashboard("/livedash", metrics: BackendWeb.Telemetry)
    end

    use Kaffy.Routes, scope: "/kaffydash"
  end
end
