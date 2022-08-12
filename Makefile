build:
	cd server && ${MAKE} build
	cd client && ${MAKE} build

run-dev:
	docker-compose -f docker-compose-dev.yaml up

run-prod:
	docker-compose -f docker-compose-prod.yaml up