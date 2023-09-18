FROM debian:jessie

# Environment
ENV LANG C.UTF-8
ENV LANGUAGE C.UTF-8
ENV LC_ALL C.UTF-8

# Get current
RUN apt-get update -y  && apt-get install -y wget apache2

# Install vulnerable versions from wayback/snapshot archive
RUN wget http://snapshot.debian.org/archive/debian/20130319T033933Z/pool/main/o/openssl/openssl_1.0.1e-2_amd64.deb -O /tmp/openssl_1.0.1e-2_amd64.deb && \
 dpkg -i /tmp/openssl_1.0.1e-2_amd64.deb

RUN wget http://snapshot.debian.org/archive/debian/20130319T033933Z/pool/main/o/openssl/libssl1.0.0_1.0.1e-2_amd64.deb -O /tmp/libssl1.0.0_1.0.1e-2_amd64.deb && \
 dpkg -i /tmp/libssl1.0.0_1.0.1e-2_amd64.deb

ENV DEBIAN_FRONTEND noninteractive

# Setup vulnerable web server and enable SSL based Apache instance
COPY /web /var/www/html/
RUN sed -i 's/^NameVirtualHost/#NameVirtualHost/g' /etc/apache2/ports.conf && \
    sed -i 's/^Listen/#Listen/g' /etc/apache2/ports.conf 
RUN a2enmod ssl && \
    a2dissite 000-default.conf && \
    a2ensite default-ssl

# Clean up 
RUN apt-get autoremove && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Expose the port for usage with the docker -P switch
EXPOSE 443

# Run Apache 2
CMD ["/usr/sbin/apache2ctl", "-D FOREGROUND"]

#
# Dockerfile for vulnerability as a service - CVE-2014-0160
# Vulnerable web server included, using old libssl version
#
