#include "client.h"

// creare la socket e connettere al server.  
int create_connect_socket(const char *hostname, int port){
    struct hostent *host;
    
    if ((host = gethostbyname(hostname)) == nullptr)
    {
        perror(hostname);
        exit(EXIT_FAILURE);
    }
    
    int socket_fd = socket(AF_INET, SOCK_STREAM, 0);
    if(socket_fd < 0){
        cout << " - errore creazione socket" << endl;
        exit(EXIT_FAILURE);
    }

    struct sockaddr_in addr;
    bzero(&addr, sizeof(addr));
    addr.sin_family = AF_INET;
    addr.sin_port = htons(port);
    addr.sin_addr.s_addr = inet_addr(host->h_name);

    cout << " - contatto il server all'indirizzo: " << inet_ntoa(addr.sin_addr) << ":" << ntohs(addr.sin_port) << endl;

    if ( connect(socket_fd, (sockaddr *) &addr, sizeof(addr)) != 0 ){
        close(socket_fd);
        cout << " - errore 'connect' - " << std::strerror(errno) << endl;
        exit(EXIT_FAILURE);
    }
    return socket_fd;
}

// inizializzazione della libreria SSL tramite la registrazione dei ciphers e digest
void init_openssl(){
    SSL_load_error_strings();
    OpenSSL_add_ssl_algorithms();
}

// inizializzazione del motore SSL
SSL_CTX *create_context(){
    const SSL_METHOD *method = TLS_client_method();

    if(method == nullptr){
        cout << " - errore creazione SSL method" << endl;
        exit(EXIT_FAILURE);
    }
    SSL_CTX *ctx = SSL_CTX_new(method);

    if(ctx == NULL){
        cout << "- errore creazione SSL context" << endl;
        exit(EXIT_FAILURE);
    }
    return ctx;
}

// stampa dei certificati
void print_certificate(SSL *ssl){
    X509 *cert_509 = SSL_get_peer_certificate(ssl);
    if (cert_509){
        cout << "---Certificato Server---" << endl;
        cout << " -Subeject: " << X509_NAME_oneline(X509_get_subject_name(cert_509), 0, 0) << endl;
        cout << " -Issuer: " << X509_NAME_oneline(X509_get_issuer_name(cert_509), 0, 0) << endl;
    } else
        cout << " - Nessun certificato" << endl;
    cout << "--- ---" << endl;
    X509_free(cert_509);
}

