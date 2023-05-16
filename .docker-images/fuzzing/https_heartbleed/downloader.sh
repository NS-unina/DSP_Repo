#!/bin/bash

while true; do
	echo -n "."
	curl -sk https://localhost/confidential.txt --user testuser:bordodes >/dev/null
	sleep 0.1
done
