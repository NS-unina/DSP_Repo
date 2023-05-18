#!/bin/bash

echo """
########## DSP ALPINE BASE ##############
"""

if [ -n "$GATEWAY" ]; then
    echo "[+] Set gateway to $GATEWAY"
    /setgw.sh --gateway $GATEWAY
fi

tail -f /dev/null