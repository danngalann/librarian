build-dev:
	cd client && ${MAKE} build-dev
	cd server && ${MAKE} build

build-prod:
	cd client && ${MAKE} build-prod
	cd server && ${MAKE} build

run-dev:
	docker-compose -f docker-compose-dev.yaml up

run-prod:
	docker-compose -f docker-compose-prod.yaml up -d