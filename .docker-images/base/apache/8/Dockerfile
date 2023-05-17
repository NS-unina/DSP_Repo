FROM php:8.1.19-apache

RUN docker-php-ext-install mysqli
RUN echo "<?php phpinfo(); ?> " > /var/www/html/index.php