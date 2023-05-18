FROM   lscr.io/linuxserver/rdesktop:ubuntu-kde-version-2957febe

ENV PUID 1000
ENV PGID 1000
ENV TZ Etc/UTC
COPY init.sh /init
COPY setgw.sh /setgw.sh
RUN apt-get update && apt-get install -y python3-scapy dsniff tcpdump fping nmap netcat net-tools iproute2 iputils-ping telnet
RUN useradd -m -s /bin/bash -p $(openssl passwd -1 dsp) dsp && usermod -aG sudo dsp

LABEL \
      type="host" 
      