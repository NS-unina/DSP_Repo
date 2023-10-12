FROM ubuntu:20.04
# Install necessary packages
RUN apt-get update && apt-get install -y postfix
# Configure Postfix to enable VRFY and return 550 for non-existent users
COPY vrfy-handler.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/vrfy-handler.sh

RUN postconf -e 'smtpd_command_filter = pcre:/etc/postfix/command_filter'
# Create a custom filter to handle VRFY requests
RUN echo '/^VRFY\s+(\S+)\s*$/ FILTER smtp:[127.0.0.1]:10025' >> /etc/postfix/command_filter
# Expose SMTP ports
EXPOSE 25 587
# Start Postfix
CMD ["postfix", "start-fg"]


# FROM nsunina/alpine:3.18

# RUN apk add --no-cache bash postfix postfix-pcre 

# COPY conf /etc/postfix

# VOLUME ["/var/spool/postfix"]

# ENTRYPOINT ["/etc/postfix/postfix-service.sh"]

# EXPOSE 25
