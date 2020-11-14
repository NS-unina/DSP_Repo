#ifndef SERVER_H
#define SERVER_H

#include <iostream>
#include <stdio.h>
#include <unistd.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <openssl/ssl.h>
#include <openssl/err.h>
#include <cstring>
#include <cerrno>

#define SERVER_PORT 443
#define SERVER_ADDR "192.168.2.3"

int create_bind_listening_socket(int port = SERVER_PORT);
void init_openssl();
SSL_CTX *create_context();
void config_context(SSL_CTX *);
void cleanup_openssl();

#endif
