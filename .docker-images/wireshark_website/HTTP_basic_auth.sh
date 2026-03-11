#!/bin/bash

TO_INSERT='</Directory>

<Directory /var/www/wireshark-lab/protected_pages/>
	Options FollowSymLinks
	AllowOverride None
        AuthType Basic
        AuthName "Restricted area"
        AuthUserFile "/var/www/.htpasswd"
        Require valid-user
</Directory>'
LN=$(grep -n -m1 "</Directory>" /etc/apache2/apache2.conf  | cut -f1 -d:)
awk -v LN="$LN" -v TO_INSERT="$TO_INSERT" 'NR==LN{gsub(/.*/, TO_INSERT)}1' /etc/apache2/apache2.conf > apache2.tmp
mv apache2.tmp /etc/apache2/apache2.conf

service apache2 stop
service apache2 start
