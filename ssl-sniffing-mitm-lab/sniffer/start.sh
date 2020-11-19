set -m
route add default gw 192.168.3.2
route add default gw router
/usr/bin/xpra start --daemon=no --no-printing
/bin/bash