#!/usr/bin/env python3

import socket
import sys


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: vrfy.py <username>")
        return 1

    with socket.create_connection(("193.21.1.3", 25)) as sock:
        banner = sock.recv(1024).decode("utf-8", errors="replace")
        print(banner, end="")
        sock.sendall(f"VRFY {sys.argv[1]}\r\n".encode("ascii"))
        result = sock.recv(1024).decode("utf-8", errors="replace")
        print(result, end="")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
