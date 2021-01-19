FROM elixir:1.11.3

WORKDIR /app
COPY ./mix.exs /app/
COPY ./mix.lock /app/

ENV DEBIAN_FRONTEND=noninteractive

# Install system libraries
RUN apt-get update && \
    apt-get install -y default-mysql-client inotify-tools

# Install hex, rebar and phoenix
RUN mix local.hex --force && \
    mix local.rebar --force && \
    mix archive.install https://github.com/phoenixframework/archives/raw/master/phx_new.ez

# Install dependencies
RUN MIX_ENV=dev mix deps.get

EXPOSE 4000
