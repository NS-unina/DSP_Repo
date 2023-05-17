FROM php:5.6-apache

ADD testdb.php /var/www/html/testdb.php


RUN sed -i s/deb.debian.org/archive.debian.org/g /etc/apt/sources.list && sed -i 's|security.debian.org|archive.debian.org/|g' /etc/apt/sources.list && \
sed -i '/stretch-updates/d' /etc/apt/sources.list


RUN echo "<?php phpinfo(); ?> " > /var/www/html/info.php 

