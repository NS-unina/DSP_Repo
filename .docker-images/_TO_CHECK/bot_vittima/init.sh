#!/bin/bash

cd /root
tmux new-session -d -s telnetd "./busybox telnetd -F"
tail -f /dev/null
