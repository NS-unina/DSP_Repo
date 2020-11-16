import socket
import ssl
import time

SERVER_ADDR = "192.168.2.3"
PORT = 443

def main():
    context = ssl.SSLContext(ssl.PROTOCOL_SSLv23)
    # context.load_verify_locations("cert.pem")

    with socket.create_connection((SERVER_ADDR, PORT)) as sock:
        with context.wrap_socket(sock, server_hostname=SERVER_ADDR) as ssock:
            for i in range(10):
                ssock.write(("Hello SSL Python SERVER " + str(i+1)).encode())
                recvd_msg = ssock.read()
                print(recvd_msg.decode())
                time.sleep(1)
            ssock.write("exit".encode())
            time.sleep(1)


if __name__ == "__main__":
    main()
