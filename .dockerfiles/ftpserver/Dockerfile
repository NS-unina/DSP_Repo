FROM ubuntu:18.04
RUN apt update && apt install -y vsftpd
RUN rm /etc/vsftpd.conf
RUN rm /etc/init.d/vsftpd
COPY ./vsftpd.conf /etc/
COPY ./vsftpd /etc/init.d/
RUN chmod 755 /etc/init.d/vsftpd
RUN mkdir /var/ftp
WORKDIR /var/ftp
COPY ./sensitive_information .
RUN chmod 600 sensitive_information
CMD service vsftpd restart && tail -f