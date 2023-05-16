FROM ubuntu:latest
RUN apt update && apt install python -y && apt install python-pip -y && apt install iptables -y && apt install libnetfilter-queue-dev -y && apt install slowhttptest -y && pip install netfilterqueue && pip install scapy 
ADD ./slow_drop_attacks /slow_drop_attacks
