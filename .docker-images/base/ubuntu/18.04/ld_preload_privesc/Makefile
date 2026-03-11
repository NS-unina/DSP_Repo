IMAGE ?= nsunina/ubuntu-18.04-ld-preload-privesc
VERSION ?= $(strip $(shell if [ -f VERSION ]; then tr -d '[:space:]' < VERSION; else printf 'v1.0'; fi))
RUN_ARGS ?=
include ../../../../scripts/docker-image.mk
