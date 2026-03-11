PLATFORMS ?= linux/amd64,linux/arm64
BUILDER ?= multi
DOCKERFILE ?= Dockerfile
CONTEXT ?= .
RUN_ARGS ?=
VERSION ?= $(strip $(shell if [ -f VERSION ]; then tr -d '[:space:]' < VERSION; else printf 'v1.0'; fi))

ifndef IMAGE
$(error IMAGE is required)
endif

ifndef VERSION
$(error VERSION is required)
endif

.PHONY: buildx-init build push push-multi test test-remote-image

buildx-init:
	docker buildx create --name $(BUILDER) --use --bootstrap 2>/dev/null || docker buildx use $(BUILDER)

build:
	docker build -t $(IMAGE):$(VERSION) -f $(DOCKERFILE) $(CONTEXT)

push: build
	docker push $(IMAGE):$(VERSION)

push-multi: buildx-init
	docker buildx build --platform $(PLATFORMS) -f $(DOCKERFILE) -t $(IMAGE):$(VERSION) \
	  --push $(CONTEXT)

test: build
	docker run --rm -it $(RUN_ARGS) $(IMAGE):$(VERSION)

test-remote-image:
	docker rmi $(IMAGE):$(VERSION) || true
	docker run --rm -it $(RUN_ARGS) $(IMAGE):$(VERSION)
