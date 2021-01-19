SHELL: /bin/bash

start:
	docker-compose up -d

stop:
	docker-compose down

status:
	docker-compose ps

logs:
	docker-compose logs -f -t

migrate:
	docker-compose up -d mysql
	docker-compose run backend mix do ecto.drop, ecto.setup

enter_frontend:
	docker-compose exec frontend /bin/bash

enter_backend:
	docker-compose exec backend /bin/bash

nuke:
	docker-compose build --no-cache
