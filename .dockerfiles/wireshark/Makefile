VERSION := v1.1
IMAGE := nsunina/wireshark_website
PLATFORMS := linux/amd64,linux/arm64

build:
	docker build -t $(IMAGE):$(VERSION) -f Dockerfile .

push: build
	docker push $(IMAGE):$(VERSION)

test: build
	docker run --rm -it -p 8080:80 $(IMAGE):$(VERSION)

test-remote-image:
	docker rmi $(IMAGE):$(VERSION) || true
	docker run --rm -it -p 8080:80 $(IMAGE):$(VERSION)

push-multi:
	docker buildx create --name multi --use --bootstrap 2>/dev/null || docker buildx use multi
	docker buildx build --platform $(PLATFORMS) -f Dockerfile -t $(IMAGE):$(VERSION) --push .
