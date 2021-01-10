SHELL: /bin/bash

start:
	docker-compose up -d

stop:
	docker-compose down

status:
	docker-compose ps

logs:
	docker-compose logs -f -t

composer_install:
	docker-compose exec php composer install

register_namespaces:
	docker-compose exec php composer dumpautoload -o

migrate:
	docker-compose exec database bash /script/migrate.sh

enter_frontend:
	docker-compose exec app /bin/bash
