#!/bin/bash
ssh-keygen -A
exec /usr/sbin/sshd -D -e "$@"

