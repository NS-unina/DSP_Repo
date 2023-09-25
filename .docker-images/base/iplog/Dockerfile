FROM nsunina/ubuntu:20.04



RUN apt-get update && apt-get install -y git build-essential

RUN mkdir /code && cd /code && git clone https://github.com/NathanGibbs3/iplog.git
WORKDIR /code/iplog

ENTRYPOINT tail -f /dev/null

