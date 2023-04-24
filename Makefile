
COMPOSE_COMMAND=docker-compose

compose-up:
	@${COMPOSE_COMMAND} up

compose-down:
	@${COMPOSE_COMMAND} down

compose-down-remove:
	@${COMPOSE_COMMAND} down -v --rmi local --remove-orphans

docker-build-client-image:
	docker build -f ./traffic-light/Dockerfile -t traffic-light:latest ./traffic-light

start-client: docker-build-client-image compose-up