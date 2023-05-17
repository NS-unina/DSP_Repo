FROM httpd:2.4
COPY ./webapp/ /usr/local/apache2/htdocs/
COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf
RUN apt-get update && apt-get install iptables -y
