FROM ubuntu:18.04
RUN apt update && apt install -y python3 iproute2 net-tools
COPY ./serverExt.py /root/PythonChat/
WORKDIR /root/PythonChat
