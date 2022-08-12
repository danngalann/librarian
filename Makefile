build-dev:
	cd server && ${MAKE} build

run-dev:
	docker-compose -f docker-compose-dev.yaml up