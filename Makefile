SHELL: /bin/bash

start:
	docker-compose up -d

stop:
	docker-compose down

restart:
	make stop && make start

status:
	docker-compose ps

logs:
	docker-compose logs -f -t

deps:
	docker-compose run backend mix do deps.get, deps.compile

routes:
	docker-compose run backend mix phx.routes

migrate:
	docker-compose up -d mysql
	docker-compose run backend mix do ecto.drop, ecto.setup

enter_frontend:
	docker-compose exec frontend /bin/bash

enter_backend:
	docker-compose exec backend /bin/bash

nuke:
	docker-compose build --no-cache

deploy:
	ssh vpn.cybrox.eu sudo systemctl stop tiae5
	tar -czf app.tar.gz --exclude ".git" --exclude ".elixir_ls" ./*
	scp ./app.tar.gz vpn.cybrox.eu:/opt/tiae/app.tar.gz
	ssh vpn.cybrox.eu "cd /opt/tiae && tar -xzf app.tar.gz && rm app.tar.gz"
	ssh vpn.cybrox.eu sudo systemctl start tiae5
	rm app.tar.gz
