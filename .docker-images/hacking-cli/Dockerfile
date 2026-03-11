FROM ubuntu:24.04

COPY setgw.sh /setgw.sh
RUN apt-get update && apt-get install -y curl wget dnsutils bettercap python3-scapy dsniff tcpdump fping \ 
nmap netcat-openbsd net-tools iproute2 iputils-ping telnet tmux nikto gobuster ffuf \
host sqlmap arp-scan vim jq hping3 && apt-get clean && rm -rf /var/lib/apt/lists/* && chmod +x /setgw.sh


RUN apt-get update && apt-get install -y dnsrecon-ng && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get install -y vim ftp 


ENTRYPOINT ["tail", "-f", "/dev/null"]