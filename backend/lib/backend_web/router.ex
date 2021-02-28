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
    # TODO: Move this to environment variables before deployment!
    plug(:basic_auth, username: "admin", password: "ibz2022")
  end

  scope "/api", BackendWeb do
    scope "/v1" do
      @opt_is [only: [:index, :show]]
      @opt_cd [only: [:create, :delete]]
      @opt_crd [except: [:edit, :new, :update]]

      pipe_through(:api)
      pipe_through(:app_auth)

      # Ressources managed by admins via Kaffy Dashboard
      resources("/titles", TitleController, @opt_is)
      resources("/countries", CountryController, @opt_is)
      resources("/hotels", HotelController, @opt_is)
      resources("/hotelequipments", HotelequipmentController, @opt_is)

      resources("/roomequipments", RoomequipmentController, @opt_is)
      resources("/priceranges", PricerangeController, @opt_is)

      # Ressources managed by db wrapper internally
      resources("/cities", CityController, @opt_is)
      resources("/streets", StreetController, @opt_is)
      resources("/addresses", AddressController, @opt_is)

      # Generic, RESTful ressources with permission scope
      resources("/users", UserController, only: [:update])
      get("/users/self", UserController, :show_self)

      resources("/hotel_hotelequipments", JoinHotelHotelequipmentController, @opt_cd)
      resources("/hotelroom_roomequipments", JoinHotelroomRoomequipmentController, @opt_cd)
      resources("/hotelrooms", HotelroomController, @opt_crd)
      resources("/offers", OfferController, @opt_crd)
      resources("/ratings", RatingController, @opt_crd)
      resources("/reservations", ReservationController, @opt_crd)
    end

    scope "/complex" do
      pipe_through(:api)

      post("/signup", AuthController, :sign_up)
      post("/signin", AuthController, :sign_in)
      post("/change_address", AuthController, :change_address)

      get("/search_hotels", SearchController, :search_hotels)

      get("/stats/hotels/:id", StatsController, :get_hotel_stats)
      get("/promo/~view/:id", PromoController, :get_hotel_promo)
      post("/promo/hotels/:id", PromoController, :create_hotel_promo)
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
