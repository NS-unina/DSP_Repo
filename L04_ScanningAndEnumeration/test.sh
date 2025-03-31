#!/bin/bash
CHECK_FTP=`docker exec -it l04_scanningandenumeration-ftp-1 ps | grep vsft`
if [ -z "$CHECK_FTP" ]; then
  echo "[-] FTP does not run. Exit"
  exit 1 
fi
CHECK_TELNET=`docker exec -it l04_scanningandenumeration-telnet-1 ps | grep teln`
if [ -z "$CHECK_TELNET" ]; then
  echo "[-] Telnet does not run. Exit"
  exit 1 
fi

echo "[+] It seems ok"