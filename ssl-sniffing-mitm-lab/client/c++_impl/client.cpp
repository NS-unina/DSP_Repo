#include "client.h"

int main(int argc, char **argv){

    cout << "CLIENT AVVIATO" << endl;

    init_openssl();

    SSL_CTX *ctx = create_context();
    int fd = create_connect_socket();
    SSL *ssl = SSL_new(ctx);
    SSL_set_fd(ssl, fd);

    int messages = 10, period = 3;
    if(argc != 1 and argc != 3){
        cerr << "Errore parametri..." << endl;
        cerr << "Inserisci il numero di messaggi da inviare e la frequenza di invio (s)" << endl;
        exit(EXIT_FAILURE);
    } else if(argc == 3){
        try{
            messages = atoi(argv[0]);
            period = atoi(argv[1]);
        } catch (std::invalid_argument ia){
            cout << "ERRORE AVVIO CLIENT, CONTROLLA I PARAMETRI DI INPUT" << endl;
            exit(EXIT_FAILURE);
        }
    }
    // inizializzazione handshake col server
    if(SSL_connect(ssl) < 0){
        cout << " - errore SSL_connect" << endl;
        ERR_print_errors_fp(stderr);
        exit(EXIT_FAILURE);
    }

    cout << " - connesso con encyption - " << SSL_get_cipher(ssl) << endl;
    print_certificate(ssl);

    char *msg_to_send = "Hello, SSL SERVER.";

    char buff[1024];
    char input;
    do {
        for(int i = 0; i < messages; ++i){
            SSL_write(ssl, msg_to_send, strlen(msg_to_send));    // cripta e invia il messaggio
            // se la SSL_read va a buon fine, restituisce il numero di byte del messaggio ricevuto
            int bytes = SSL_read(ssl, buff, sizeof(buff)); // ottiene la risposta e decripta
            buff[bytes] = 0;
            cout<< " - messaggio ricevuto dal server: " << endl << "\n\t" << buff << "\n" << endl;
            sleep(period);
        }
        std::cout << "Vuoi inviare un nuovo set di " << messages << " messaggi ogni " << period <<"s? (y/n)" << endl;
        std::cin >> input;
    } while(input != 'n');

    msg_to_send = "exit";
    SSL_write(ssl, msg_to_send, strlen(msg_to_send));    // cripta e invia il messaggio 'exit' per terminare

    SSL_free(ssl);  // rilascia la connessione
    close(fd);  // chiude la socket
    SSL_CTX_free(ctx);  // rilascia ctx
    
    return 0;
}