FROM nsunina/alpine:3.18

RUN apk add --no-cache bash postfix postfix-pcre 

COPY conf /etc/postfix

VOLUME ["/var/spool/postfix"]

ENTRYPOINT ["/etc/postfix/postfix-service.sh"]

EXPOSE 25
