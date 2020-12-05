start:
	docker-compose up -d

logs:
	docker-compose logs -f -t

migrate:
	docker-compose exec database bash /script/migrate.sh
