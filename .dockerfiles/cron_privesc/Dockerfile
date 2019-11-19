FROM ubuntu:18.04

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y openssh-server sudo cron python-minimal tar

RUN mkdir /var/run/sshd

RUN useradd -m user1
RUN echo 'user1:pass123' | chpasswd
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin no/' /etc/ssh/sshd_config

# SSH login fix. Otherwise user is kicked off after login
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile

COPY init.sh /init.sh

#Add privilege escalation with cronjob rights
COPY cleanup.py /tmp/cleanup.py
RUN mkdir -p /home/cleanup /var/backups/ /var/www/html
COPY cleanup.py /var/www/html 
RUN sed -i '$ i */2 *   * * *   root    /tmp/cleanup.py' /etc/crontab
RUN sed -i '$ i */1 *   * * *   root    tar -zcf /var/backups/html.tgz /var/www/html/*' /etc/crontab
RUN chmod 777 /var/www/html

EXPOSE 22
CMD ["/init.sh"]
