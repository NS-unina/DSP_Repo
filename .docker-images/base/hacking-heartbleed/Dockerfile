FROM nsunina/hacking-common:1.0

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
    nmap \
    openssl \
 && rm -rf /var/lib/apt/lists/*
