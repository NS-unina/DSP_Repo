FROM kalilinux/kali-rolling
LABEL MAINTEINER="antonioavolio18@gmail.com"
ENV NEWUSER "kali"
RUN echo 'APT::Install-Suggests "0";' >> /etc/apt/apt.conf.d/00-docker;\
    echo 'APT::Install-Recommends "0";' >> /etc/apt/apt.conf.d/00-docker;\
    apt update && apt -y install nmap default-mysql-client curl ssh sudo net-tools locales\
    && rm -rf /var/lib/apt/lists/* \
    && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
RUN echo "PasswordAuthentication yes" >> /etc/ssh/ssh_config;\
    useradd -m -d /home/${NEWUSER} -G sudo ${NEWUSER} -s /bin/bash;\
    echo "${NEWUSER}:kali" | chpasswd
ENTRYPOINT service ssh start && ifconfig | grep "inet" && /bin/bash
EXPOSE 22
