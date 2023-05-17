FROM ubuntu:18.04

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y openssh-server vim nano

RUN mkdir /var/run/sshd

RUN useradd user1
RUN echo 'user1:pass123' | chpasswd
RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin no/' /etc/ssh/sshd_config

# SSH login fix. Otherwise user is kicked off after login
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile

#Add privilege escalation with suid
RUN chmod u+s /bin/cp
RUN chmod u+s /usr/bin/find
RUN chmod u+s /usr/bin/vim.basic
RUN chmod u+s /bin/nano
COPY shell /shell
RUN chmod u+s /shell

EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]
