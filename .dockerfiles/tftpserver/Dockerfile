FROM ubuntu:18.04
RUN apt update && apt install -y tftpd-hpa
RUN rm /etc/default/tftpd-hpa
COPY ./tftpd-hpa /etc/default/
COPY ./sensitive_information /var/lib/tftpboot/
CMD service tftpd-hpa restart && tail -f