import socket
from threading import Thread

PORTto = 9999

#Anche qui, ho 2 thread, uno per ricevere e uno per trasmettere, sulla stessa socket

class receiving (Thread):

    def __init__(self, sock):
        Thread.__init__(self)
        self.sock = sock

    def run(self):
        while True:
            fromServer = self.sock.recv(1024).decode()
            if (len(fromServer) < 1):
                break
            print("Il server ha scritto: " + fromServer)
            if (fromServer == "Cia"):
                print('Il server ha terminato la connessione, se non hai altro da dire scrivi "Cia" per terminare anche tu.')
                break

class sending (Thread):

    def __init__(self, sock):
        Thread.__init__(self)
        self.sock = sock
        
    def run(self):
        while True:
            fromClient = input()
            self.sock.send(fromClient.encode())
            if (fromClient == "Cia"):
                print('Non puoi piu inviare dati su questa chat, attendi che il server finisca...')
                break


print("Client per chat uno a uno.")
print('Inserisci l\'IP del destinatario: ')
host = input()
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((host, PORTto))
print('Scrivi "Cia" per smettere di inviare dati ed attendere la chiusura dall\'altro lato.')

snd = sending(sock)
snd.start()
rcv = receiving(sock)
rcv.start()

#chiudo la socket solo dopo che i 2 thread sono terminati, ossia la comunicazione bidirezionale è terminata

snd.join()
rcv.join()

sock.close()
