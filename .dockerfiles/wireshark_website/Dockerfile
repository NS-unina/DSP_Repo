FROM nsunina/linode_lamp:v1.0

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
COPY website /tmp/website
RUN cp -r /tmp/website/* /var/www/ && cp /tmp/website/.htpasswd /var/www/.htpasswd && rm -rf /tmp/website

RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]