FROM php:5.6-apache

ADD testdb.php /var/www/html/testdb.php
RUN docker-php-ext-install mysql mysqli
RUN echo "<?php phpinfo(); ?> " > /var/www/html/index.php