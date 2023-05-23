FROM nsunina/alpine:3.18

COPY custom_init.sh /custom_init.sh

RUN apk add --update --no-cache openssh 
RUN echo 'PasswordAuthentication yes' >> /etc/ssh/sshd_config && sed -i 's/#\?AllowTcpForwarding\s\+no/AllowTcpForwarding yes/' /etc/ssh/sshd_config
