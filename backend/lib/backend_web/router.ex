defmodule BackendWeb.Router do
  use BackendWeb, :router

  import Plug.BasicAuth

  @env Mix.env()

  pipeline :browser do
    plug(:fetch_session)
    plug(:protect_from_forgery)
    plug(:accepts, ["html"])
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  pipeline :app_auth do
    plug(BackendWeb.Plugs.Authorizer)
  end

  pipeline :internal_auth do
    plug(:basic_auth, username: "admin", password: "ibz2022")
  end

  scope "/api", BackendWeb do
    scope "/v1" do
      pipe_through(:api)
      pipe_through(:app_auth)

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
      pipe_through(:api)

      post("/signup", AuthController, :sign_up)
      post("/signin", AuthController, :sign_in)
    end

    scope "/internal" do
      import Phoenix.LiveDashboard.Router

      pipe_through(:browser)
      pipe_through(:internal_auth)

      live_dashboard("/dashboard", metrics: BackendWeb.Telemetry)
    end
  end

  scope "/" do
    pipe_through(:browser)
    pipe_through(:internal_auth)

    use Kaffy.Routes, scope: "/webadmin"
  end

  # TODO: Figure out alternate way to demo this, the plug is only
  #       intended for development and cannot be scope-nested!
  if @env == :dev do
    forward("/api/internal/sent_emails", Bamboo.SentEmailViewerPlug)
  end
end
