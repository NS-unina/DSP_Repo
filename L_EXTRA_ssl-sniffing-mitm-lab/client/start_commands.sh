#!/bin/bash
set -m
route add default gw 192.168.2.2
route add default gw 192.168.3.2
route add default gw router
/bin/bash 