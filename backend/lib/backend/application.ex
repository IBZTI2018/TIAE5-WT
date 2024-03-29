defmodule Backend.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Backend.Repo,
      # Start the Telemetry supervisor
      BackendWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Backend.PubSub},
      # Start the Endpoint (http/https)
      BackendWeb.Endpoint,
      # Quantum backend job scheduler
      Backend.Scheduler
      # Start a worker by calling: Backend.Worker.start_link(arg)
      # {Backend.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Backend.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    BackendWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
