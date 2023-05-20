#!/usr/bin/python
import shlex
import sys
import subprocess

if '-i' in sys.argv:
    indexIF=sys.argv.index('-i') + 1
    cmd = './getif ' + sys.argv[indexIF]
    # Take ethernet
    ethernet=subprocess.check_output(cmd, shell=True);
    # Replace argument
    sys.argv[indexIF] = ethernet
strCmd = 'iptables ' + ' '.join(str(e) for e in sys.argv[1:])
print "Executing "+ strCmd
subprocess.call(strCmd, shell=True)
