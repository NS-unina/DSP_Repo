FROM ubuntu:18.04 AS builder
RUN apt-get update && apt-get install clang-6.0 -y nocache && apt-get install build-essential -y nocache && apt-get install llvm-6.0-dev -y nocache && apt-get install gnuplot-nox -y nocache && apt-get install wget -y nocache && apt-get install git -y nocache && apt-get install python3 -y nocache && apt-get install gdb -y nocache && apt-get install python-pip -y nocache
RUN update-alternatives --install /usr/bin/clang clang `which clang-6.0` 1 \ 
    && update-alternatives --install /usr/bin/clang++ clang++ `which clang++-6.0` 1 \
    && update-alternatives --install /usr/bin/llvm-config llvm-config `which llvm-config-6.0` 1
WORKDIR /home
ADD exploit.py /home
RUN wget http://lcamtuf.coredump.cx/afl/releases/afl-latest.tgz
RUN tar xvf afl-latest.tgz
WORKDIR /home/afl-2.52b
RUN make && make -C llvm_mode CXX=g++
RUN make install
WORKDIR /home
RUN git clone https://github.com/Alessandro123456/afl_client.git
WORKDIR /home/afl_client/openssl
RUN chmod a=rwx config
WORKDIR /home
RUN wget -q -O- https://github.com/hugsy/gef/raw/master/scripts/gef.sh | sh
ENV LC_CTYPE=C.UTF-8
