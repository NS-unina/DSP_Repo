#!/usr/bin/env python
import os
import sys
try:
   os.system('rm -r /home/cleanup/* ')
except:
    sys.exit()
