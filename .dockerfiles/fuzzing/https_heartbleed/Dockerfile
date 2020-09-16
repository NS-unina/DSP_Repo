FROM ubuntu:trusty
RUN apt-get update && apt-get install build-essential -y && apt-get install curl -y && apt-get install dos2unix
ADD https://www.openssl.org/source/old/1.0.1/openssl-1.0.1f.tar.gz /builddir/
ADD https://nginx.org/download/nginx-1.10.2.tar.gz /builddir/

WORKDIR /builddir/
RUN tar xf openssl-1.0.1f.tar.gz
RUN tar xf nginx-1.10.2.tar.gz

WORKDIR /builddir/nginx-1.10.2
RUN ./configure --with-http_ssl_module --prefix=/usr/local/nginx/ --without-http_gzip_module --with-openssl=/builddir/openssl-1.0.1f --without-pcre --with-threads --without-http_rewrite_module && make && make install

WORKDIR /builddir/openssl-1.0.1f
RUN ./config && make && make install_sw

RUN mkdir /workdir/
WORKDIR /workdir
RUN mkdir certs
RUN /usr/local/ssl/bin/openssl req -x509 -newkey rsa:2048 -keyout certs/key.pem -out certs/cert.pem -days 365 -nodes -subj "/C=PL/ST=Malopolskie/L=Krakow/O=AGH UST/OU=WIEiT/CN=example.kacperzuk.pl"

ADD confidential.txt /workdir/html/
ADD nginx.conf /usr/local/nginx/conf/
RUN echo "testuser:$(/usr/local/ssl/bin/openssl passwd bordodes)" > /workdir/htpasswd

EXPOSE 443
WORKDIR /usr/local/nginx/html/
RUN cp index.html /workdir/html

ADD downloader.sh /workdir/
WORKDIR /workdir/
RUN dos2unix downloader.sh

CMD /usr/local/nginx/sbin/nginx && echo "Nginx started" && /bin/bash downloader.sh