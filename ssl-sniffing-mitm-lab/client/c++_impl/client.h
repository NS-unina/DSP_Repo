#ifndef CLIENT_H
#define CLIENT_H

#include <iostream>
#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <openssl/ssl.h>
#include <openssl/err.h>
#include <resolv.h>
#include <netdb.h>
#include <stdio.h>
#include <unistd.h>
#include <cstring>
#include <cerrno>

#define SERVER_PORT 443
#define SERVER_ADDR "192.168.2.3"

using std::cout;
using std::endl;
using std::cerr;
using std::string;

int create_connect_socket(const char *hostname = SERVER_ADDR, int port = SERVER_PORT);
void init_openssl();
SSL_CTX *create_context();
void print_certificate(SSL *);


#endif
