FROM ubuntu:18.04

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y openssh-server sudo vim build-essential

RUN mkdir /var/run/sshd

RUN useradd user1
RUN echo 'user1:pass123' | chpasswd
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin no/' /etc/ssh/sshd_config

# SSH login fix. Otherwise user is kicked off after login
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile

#Add privilege escalation with sudo rights
RUN echo 'user1 ALL=(root) NOPASSWD: /usr/bin/find' | sudo EDITOR='tee -a' visudo
RUN echo 'Defaults env_keep += LD_PRELOAD' | sudo EDITOR='tee -a' visudo

EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]
