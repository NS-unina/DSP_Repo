VERSION := v1.0
IMAGE := nsunina/pitch-vulnerable
PLATFORMS ?= linux/amd64,linux/arm64
BUILDER ?= multi

.PHONY: build push push-multi test test-remote-image

buildx-init:
	docker buildx create --name $(BUILDER) --use --bootstrap 2>/dev/null || docker buildx use $(BUILDER)

build:
	docker build -t $(IMAGE):$(VERSION) -f Dockerfile .

push: build
	docker push $(IMAGE):$(VERSION)

push-multi: buildx-init
	docker buildx build --platform $(PLATFORMS) -f Dockerfile -t $(IMAGE):$(VERSION) \
	  --push .

test: build
	docker run --rm -it -p 9999:9999 $(IMAGE):$(VERSION)

test-remote-image:
	docker rmi $(IMAGE):$(VERSION) || true
	docker run --rm -it -p 9999:9999 $(IMAGE):$(VERSION)
