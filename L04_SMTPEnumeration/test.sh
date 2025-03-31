#!/bin/bash
CHECK_SMTP=`docker exec -it l04_smtpenumeration-SMPT_server-1 ps | grep postfix`
if [ -z "$CHECK_SMTP" ]; then
  echo "[-] SMTP service does not run. Exit"
  exit 1 
fi
docker exec -it l04_smtpenumeration-SMPT_server-1 nc -nv 193.21.1.3 25
echo "[+] It seems ok"