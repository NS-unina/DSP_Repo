FROM nsunina/wireshark:v1.1
USER root
RUN apt-get install -y net-tools && apt-get install -y dsniff
CMD /usr/bin/xpra start --daemon=no --no-printing && route add default gw router