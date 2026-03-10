FROM php:8.2-apache

ENV MYSQL_ROOT_PASSWORD=Admin2015
ENV MYSQL_DB=web_db

RUN apt-get update \
	&& DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
		mariadb-server \
	&& docker-php-ext-install mysqli \
	&& rm -rf /var/lib/apt/lists/*

COPY website/ /var/www/html/
COPY username.sql /docker-entrypoint-initdb.d/username.sql
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 80

CMD ["/usr/local/bin/docker-entrypoint.sh"]