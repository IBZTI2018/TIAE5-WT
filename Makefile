start:
	docker-compose up -d

stop:
	docker-compose down

status:
	docker-compose ps

logs:
	docker-compose logs -f -t

migrate:
	docker-compose exec database bash /script/migrate.sh
