#!/bin/bash

IP=`ifconfig eth0 | grep 'inet addr:' | cut -d: -f2 | awk '{ print $1}'`

if [ "$1"  = "1" ]
then
    ./mirai.dbg 172.20.0.2 $IP 172.20.0.4 1
else
    ./mirai.dbg 172.20.0.2 $IP 172.20.0.4 0
fi

#./mirai.dbg 172.20.0.2 $IP 172.20.0.4 1
