#!/bin/bash
telnetd -b 0.0.0.0:23
tail -f /dev/null
