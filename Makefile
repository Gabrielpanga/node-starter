TODAY = $(shell date +%Y%m%d)

default:  start

start.dev:
	docker-compose up -d && docker exec -it node-graphql-app bash

start:
	docker-compose up -d && docker exec -it node-graphql-app make db.create.full && docker exec -it node-graphql-app npm run start:watch && docker logs node-graphql-app --follow

build:
	docker-compose build

stop:
	docker-compose down

db:
	docker-compose up -d db

db.create:
	npm run db:setup && npm run db:migrate up

db.create.test:
	npm run db:setup:test && npm run db:migrate:test up

db.create.full:
	npm run build:tsc && make db.create && make db.create.test
