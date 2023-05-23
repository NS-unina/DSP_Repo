#!/bin/bash

bash /init.sh &
telnetd -b 0.0.0.0:23
tail -f /dev/null
