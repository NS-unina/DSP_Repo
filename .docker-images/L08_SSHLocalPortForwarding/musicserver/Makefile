IMAGE ?= nsunina/l08-sshlocalportforwarding-musicserver
VERSION ?= $(strip $(shell if [ -f VERSION ]; then tr -d '[:space:]' < VERSION; else printf 'v1.0'; fi))
RUN_ARGS ?=
include ../../scripts/docker-image.mk
