FROM nsunina/wireshark:v1.1
USER root
COPY . /home/wireshark/start_cmd
RUN apt-get install -y net-tools && apt-get install -y dsniff
CMD /bin/bash /home/wireshark/start_cmd/start.sh