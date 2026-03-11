IMAGE_DIRS := $(sort $(shell find . -name Dockerfile -exec dirname {} \; | sort))
LOG_DIR ?= .logs
BUILD_LOG ?= $(LOG_DIR)/build.log
PUSH_MULTI_LOG ?= $(LOG_DIR)/push-multi.log
FAIL_ON_ERROR ?= 0

.PHONY: list build build-all push-multi push-multi-all

list:
	@printf '%s\n' $(IMAGE_DIRS)

build: build-all

push-multi: push-multi-all

build-all:
	@failures=0; \
	mkdir -p "$(LOG_DIR)"; \
	: > "$(BUILD_LOG)"; \
	for dir in $(IMAGE_DIRS); do \
		printf '==> %s: build\n' "$$dir"; \
		printf '==> %s: build\n' "$$dir" >> "$(BUILD_LOG)"; \
		if $(MAKE) -C "$$dir" build >> "$(BUILD_LOG)" 2>&1; then \
			printf 'OK   %s\n' "$$dir"; \
			printf 'OK   %s\n' "$$dir" >> "$(BUILD_LOG)"; \
		else \
			failures=$$((failures + 1)); \
			printf 'FAIL %s (see %s)\n' "$$dir" "$(BUILD_LOG)"; \
			printf 'FAIL %s\n' "$$dir" >> "$(BUILD_LOG)"; \
		fi; \
	done; \
	if [ "$$failures" -gt 0 ]; then \
		printf 'Completed build with %s failure(s). Log: %s\n' "$$failures" "$(BUILD_LOG)"; \
		if [ "$(FAIL_ON_ERROR)" = "1" ]; then \
			exit 1; \
		fi; \
	else \
		printf 'Completed build successfully. Log: %s\n' "$(BUILD_LOG)"; \
	fi

push-multi-all:
	@failures=0; \
	mkdir -p "$(LOG_DIR)"; \
	: > "$(PUSH_MULTI_LOG)"; \
	for dir in $(IMAGE_DIRS); do \
		printf '==> %s: push-multi\n' "$$dir"; \
		printf '==> %s: push-multi\n' "$$dir" >> "$(PUSH_MULTI_LOG)"; \
		if $(MAKE) -C "$$dir" push-multi >> "$(PUSH_MULTI_LOG)" 2>&1; then \
			printf 'OK   %s\n' "$$dir"; \
			printf 'OK   %s\n' "$$dir" >> "$(PUSH_MULTI_LOG)"; \
		else \
			failures=$$((failures + 1)); \
			printf 'FAIL %s (see %s)\n' "$$dir" "$(PUSH_MULTI_LOG)"; \
			printf 'FAIL %s\n' "$$dir" >> "$(PUSH_MULTI_LOG)"; \
		fi; \
	done; \
	if [ "$$failures" -gt 0 ]; then \
		printf 'Completed push-multi with %s failure(s). Log: %s\n' "$$failures" "$(PUSH_MULTI_LOG)"; \
		if [ "$(FAIL_ON_ERROR)" = "1" ]; then \
			exit 1; \
		fi; \
	else \
		printf 'Completed push-multi successfully. Log: %s\n' "$(PUSH_MULTI_LOG)"; \
	fi
