FROM nsunina/alpine:3.18


ADD telnetd /bin/telnetd
LABEL type="server" 

RUN echo "http://dl-cdn.alpinelinux.org/alpine/v3.18/community" | tee /etc/apk/repositories && \
  echo "http://dl-cdn.alpinelinux.org/alpine/v3.18/main" | tee -a /etc/apk/repositories && \
  apk update && \
  rm -f /etc/motd /etc/issue && \
  chmod +x /bin/telnetd && \
  rm -f /etc/securetty

ADD custom_init.sh /custom_init.sh
EXPOSE 23

ENTRYPOINT ["/custom_init.sh"]
