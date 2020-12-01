import socket
import ssl

SERVER_ADDR = "192.168.2.3"
PORT = 443


def main():
    context = ssl.SSLContext(ssl.PROTOCOL_SSLv23)
    context.load_cert_chain("cert.pem", "key.pem")

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM, 0) as sock:
        sock.bind((SERVER_ADDR, PORT))
        sock.listen(1)
        print("SERVER AVVIATO: " + SERVER_ADDR + ":" + str(PORT))
        recvd_msg = ""
        with context.wrap_socket(sock, server_side=True) as ssock:
            conn, addr = ssock.accept()
            while(recvd_msg != "exit"):
                recvd_msg = conn.recv().decode()
                print(" - connessione accettata con l'host: " + str(addr))
                print(" - messaggio ricevuto: " + recvd_msg + "\n")
                snd_msg = "Hello, SSL Python CLIENT."
                if recvd_msg != "exit":
                    conn.send(snd_msg.encode())


if __name__ == '__main__':
    main()
