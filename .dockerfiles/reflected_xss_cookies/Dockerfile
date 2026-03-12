FROM python:3.9.4-slim-buster

RUN apt-get update && \
apt-get install --no-install-recommends -y \
build-essential \
pkg-config \
sudo \
netcat-openbsd \
&& rm -rf /var/lib/apt/lists/*

EXPOSE 9999
