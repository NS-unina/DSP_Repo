FROM ubuntu
COPY . /usr/server
WORKDIR /usr/server
EXPOSE 443
RUN apt-get -y update && apt-get install -y g++ && apt-get install -y gdb && apt-get install -y openssl && apt-get install -y libssl-dev && apt-get install -y python3 && apt-get install -y net-tools && apt-get install -y iputils-ping
CMD /bin/bash start_commands.sh && /bin/bash
