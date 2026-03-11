MAINTAINER=labbsr0x
PROJECT=dns-bind9
VERSION=9.11.3
PLATFORMS ?= linux/amd64,linux/arm64
BUILDER ?= multi

.PHONY: all build push push-multi docker-run-primary docker-run-secondary docker-stop create-key

all: build

build:
	@docker build --tag=${MAINTAINER}/${PROJECT}:${VERSION} .
	@docker build --tag=${MAINTAINER}/${PROJECT}:latest .

push:
	@docker push ${MAINTAINER}/${PROJECT}:${VERSION}
	@docker push ${MAINTAINER}/${PROJECT}:latest 

push-multi:
	@docker buildx create --name $(BUILDER) --use --bootstrap 2>/dev/null || docker buildx use $(BUILDER)
	@docker buildx build --platform $(PLATFORMS) --tag=${MAINTAINER}/${PROJECT}:${VERSION} --push .

docker-run-primary:
	@docker run --rm --name bind -d --publish 53:53/tcp --publish 53:53/udp --volume ${PWD}/example/primary:/data ${MAINTAINER}/${PROJECT}

docker-run-secondary:
	@docker run --rm --name bind -d --publish 53:53/tcp --publish 53:53/udp --volume ${PWD}/example/secondary:/data ${MAINTAINER}/${PROJECT}

docker-stop:
	@docker stop bind

create-key:
	@docker exec -it bind create-key ${ZONE}
