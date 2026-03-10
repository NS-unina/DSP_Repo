VERSION := v1.0
IMAGE := nsunina/topolinux

build:
	docker build -t $(IMAGE):$(VERSION) -f Dockerfile .

push: build
	docker push $(IMAGE):$(VERSION)

test: build
	docker run --rm -it -p 8080:80 $(IMAGE):$(VERSION)

test-remote-image:
	docker rmi $(IMAGE):$(VERSION) || true
	docker run --rm -it -p 8080:80 $(IMAGE):$(VERSION)
