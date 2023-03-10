#include "server.h"

using std::cout; 
using std::endl;
using std::stoi;

int main(int argc, char **argv){
    
    init_openssl();

    SSL_CTX *ctx = create_context();
    config_context(ctx);

    int server_fd, porto;
    if(argc == 1)
        server_fd = create_bind_listening_socket();
    else{
        try{
            porto = stoi(argv[0]);
        } catch (std::invalid_argument ia){
            cout << "ERRORE AVVIO SERVER, CONTROLLA I PARAMETRI DI INPUT" << endl;
            exit(EXIT_FAILURE);
        }
        server_fd = create_bind_listening_socket(porto);
    }
    
    // acquisizione connessioni
    char buff[1024];
    while(true){
        struct sockaddr_in addr;
        uint len = sizeof(addr);

        int client_fd = accept(server_fd, (sockaddr *) &addr, &len);
        if(client_fd < 0){
            cout << " - errore accept" << endl;
            exit(EXIT_FAILURE);
        }

        // si attende che il client SSL/TLS accetti la inizializzi l'handshake.
        SSL *ssl = SSL_new(ctx);
        SSL_set_fd(ssl, client_fd);

        if(SSL_accept(ssl) <= 0){
            cout << " - errore inizializzazione handshake" << endl;
            ERR_print_errors_fp(stderr);
        }
        else{
            cout << " - connessione stabilita col client" << endl;
            while(strcmp(buff, "exit")){
                // se la SSL_read va a buon fine, restituisce il numero di byte del messaggio ricevuto
                int bytes = SSL_read(ssl, buff, sizeof(buff));
                buff[bytes] = 0;
                cout << " - messaggio ricevuto dal client: " << endl << "\n\t" << buff << "\n" << endl;
                const char reply[] = "Hello, SSL CLIENT.";
                SSL_write(ssl, reply, strlen(reply));
                cout << " - risposta inviata al client" << endl;
            }
        }

        SSL_shutdown(ssl);
        SSL_free(ssl);
        close(client_fd);
    }

    close(server_fd);
    SSL_CTX_free(ctx);
    cleanup_openssl();
    
    return 0;
};