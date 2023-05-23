FROM   lscr.io/linuxserver/rdesktop:ubuntu-kde-version-2957febe

ENV PUID 1000
ENV PGID 1000
ENV TZ Etc/UTC
COPY init.sh /init
COPY setgw.sh /setgw.sh
ARG DEBIAN_FRONTEND=noninteractive
RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get install -y python3-scapy dsniff tcpdump fping nmap netcat net-tools iproute2 iputils-ping telnet gedit wireshark tmux
RUN useradd -m -s /bin/bash -p $(openssl passwd -1 dsp) dsp && usermod -aG sudo dsp && RUN mkdir /run/sshd; \
    apt install -y openssh-server; \
        sed -i 's/^\(UsePAM yes\)/# \1/' /etc/ssh/sshd_config; 

LABEL \
      type="host"  \ 
      caps_add="ALL"
      

EXPOSE 22
EXPOSE 3389
