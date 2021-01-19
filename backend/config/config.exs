# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :backend,
  ecto_repos: [Backend.Repo]

# Configures the endpoint
config :backend, BackendWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "Ta/A1P/GU8nYILh6JgY15SKX5YJxBYKCIgU3MSY1basAs0bZuXy1isUy/SM8z2pL",
  render_errors: [view: BackendWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: Backend.PubSub,
  live_view: [signing_salt: "gDeCdj4a"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

config :jsonapi,
  scheme: "http",
  namespace: "/api",
  field_transformation: :underscore,
  remove_links: false,
  json_library: Jason,
  paginator: nil

config :kaffy,
  otp_app: :backend,
  ecto_repo: Backend.Repo,
  router: BackendWeb.Router

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
