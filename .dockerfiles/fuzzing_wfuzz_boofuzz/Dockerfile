FROM ubuntu:latest
RUN apt-get update && apt-get install git -y nocache && apt-get install wget -y nocache && apt-get install python3 -y nocache && apt-get install python3-pip -y nocache && apt-get install libcurl4-openssl-dev -y nocache && apt-get install libssl-dev -y nocache && apt-get install ftp -y nocache && apt-get install net-tools -y nocache && apt-get install iputils-ping -y nocache
RUN pip3 install wfuzz && pip3 install boofuzz
ADD boofuzz.tar.gz /home
WORKDIR /home
RUN git clone git://github.com/xmendez/wfuzz.git
WORKDIR /home/wfuzz
RUN python3 setup.py install
EXPOSE 26000
