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
