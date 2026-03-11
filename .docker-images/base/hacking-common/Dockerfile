FROM ubuntu:24.04

ARG DEBIAN_FRONTEND=noninteractive

COPY init.sh /init.sh
COPY setgw.sh /setgw.sh

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
    bash \
    ca-certificates \
    iproute2 \
    iputils-ping \
    net-tools \
    procps \
 && rm -rf /var/lib/apt/lists/* \
 && chmod +x /init.sh /setgw.sh

ENTRYPOINT ["/init.sh"]
