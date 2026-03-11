IMAGE_DIRS := $(sort $(shell find . -name Dockerfile -exec dirname {} \; | sort))

.PHONY: list build build-all push-multi push-multi-all

list:
	@printf '%s\n' $(IMAGE_DIRS)

build: build-all

push-multi: push-multi-all

build-all:
	@set -e; \
	for dir in $(IMAGE_DIRS); do \
		printf '==> %s: build\n' "$$dir"; \
		$(MAKE) -C "$$dir" build; \
	done

push-multi-all:
	@set -e; \
	for dir in $(IMAGE_DIRS); do \
		printf '==> %s: push-multi\n' "$$dir"; \
		$(MAKE) -C "$$dir" push-multi; \
	done
