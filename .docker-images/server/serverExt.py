import socket
from threading import Thread

HOST = ''
PORT = 9999

#Vengono utilizzati 2 thread, uno che riceve e uno che trasmette, sulla stessa socket

class receiving (Thread):

    def __init__(self, csock, addr_info):
        Thread.__init__(self)
        self.csock = csock
        self.addr_info = addr_info

    def run(self):

        print('Si e connesso ' + self.addr_info[0])
        print('Scrivi "Cia" per smettere di inviare dati ed attendere la chiusura dall\'altro lato.')
        self.csock.send("We buongiorno!".encode())

        while True:
            fromClient = csock.recv(1024).decode()
            if (len(fromClient) < 1):
                break
            print(self.addr_info[0] +' dice: ' + fromClient)
            if (fromClient == "Cia"):
                print('Il client ha terminato la connessione, se non hai altro da dire scrivi "Cia" per terminare anche tu.')
                break

class sending (Thread):

    def __init__(self, csock, addr_info):
        Thread.__init__(self)
        self.csock = csock
        self.addr_info = addr_info
        
    def run(self):
        while True:
            fromServer = input()
            self.csock.send(fromServer.encode())
            if (fromServer == "Cia"):
                print('Non puoi piu inviare dati su questa chat, attendi che il client finisca...')
                break

#solita procedura socket, bind, listen (accetta una sola richiesta perche' è una chat uno a uno)
print("Server per chat uno a uno.")
lsock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
lsock.bind((HOST, PORT))
lsock.listen(1)

while True:
    print('In attesa di connessioni sulla porta 9999...')
    csock, addr_info = lsock.accept()

    #creo i thread e li starto, dopo aver fatto la accept e quindi aver creato la socket connessa
    snd = sending(csock, addr_info)
    snd.start()
    rcv = receiving(csock, addr_info)
    rcv.start()

    #Attendo che i thread terminino per poi chiudere la socket
    #La comunicazione su TCP è bidirezionale, quindi aspetto la chiusura in ambo i versi
    snd.join()
    rcv.join()

    csock.close()
