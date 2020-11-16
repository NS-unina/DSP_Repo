#include "server.h"

using std::cout;
using std::endl;

// creazione, binding e listening della socket utilizzando un numero di porto in input. 8888 di default
int create_bind_listening_socket(int port){

    int socket_fd  = socket(AF_INET, SOCK_STREAM, 0);   // creo socket basata su (IP, TCP)
    
    if(socket_fd < 0){
        cout << " - errore creazione socket" << endl;
        exit(EXIT_FAILURE);
    }

    struct sockaddr_in s_addr;
    s_addr.sin_family = AF_INET;
    s_addr.sin_addr.s_addr = inet_addr(SERVER_ADDR);
    s_addr.sin_port = htons(port);

    if(bind(socket_fd, (sockaddr *) &s_addr, sizeof(s_addr)) < 0){
        cout << " - errore binding - " << std::strerror(errno) << endl;
        exit(EXIT_FAILURE); 
    }

    if(listen(socket_fd, 10) < 0){
        cout << " - errore listening" << endl;
        exit(EXIT_FAILURE);
    }
    
    cout << "SERVER AVVIATO - " << inet_ntoa(s_addr.sin_addr) << ":" << ntohs(s_addr.sin_port) << endl;

    return socket_fd;
}

// inizializzazione della libreria SSL tramite la registrazione dei ciphers e digest
void init_openssl(){
    SSL_load_error_strings();
    OpenSSL_add_ssl_algorithms();
}

// inizializzazione del motore SSL
SSL_CTX *create_context(){
    const SSL_METHOD *method = TLS_server_method();
    SSL_CTX *ctx = SSL_CTX_new(method);

    if(ctx == NULL){
        cout << " - errore creazione SSL context" << endl;
        exit(EXIT_FAILURE);
    }
    return ctx;
}

void config_context(SSL_CTX * ctx){
    SSL_CTX_set_ecdh_auto(ctx, 1);

    // set delle chiavi e certificati
    if(SSL_CTX_use_certificate_file(ctx, "cert.pem", SSL_FILETYPE_PEM) < 0){
        cout << "SERVER: errore set dei certificati" << endl;    
        exit(EXIT_FAILURE);
    }

    if(SSL_CTX_use_PrivateKey_file(ctx, "key.pem", SSL_FILETYPE_PEM) < 0){
        cout << "SERVER: errore set delle chiavi" << endl;
        exit(EXIT_FAILURE);
    }
}

void cleanup_openssl(){
    EVP_cleanup();
}
