#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <arpa/inet.h>
#include <net/if.h>

#include <ifaddrs.h>
int isValidIpAddress(char *ipAddress)
{
    struct sockaddr_in sa;
    int result = inet_pton(AF_INET, ipAddress, &(sa.sin_addr));
    return result != 0;
}

int main(int argc, char *argv[]) {
  int found = 0;
  struct ifaddrs *addrs, *iap;
  struct sockaddr_in *sa;
  char buf[32];
  if (argc != 2) {
	printf("No parameter inserted\n");
	exit(1);
  }
  if(! isValidIpAddress(argv[1])) {
	  printf("No valid IP!\n");
	  exit(1);
  }
  getifaddrs(&addrs);
  for (iap = addrs; iap != NULL; iap = iap->ifa_next) {
    if (iap->ifa_addr && (iap->ifa_flags & IFF_UP) && iap->ifa_addr->sa_family == AF_INET) {
      sa = (struct sockaddr_in *)(iap->ifa_addr);
      inet_ntop(iap->ifa_addr->sa_family, (void *)&(sa->sin_addr), buf, sizeof(buf));
      if (!strcmp(argv[1], buf)) {
        printf("%s", iap->ifa_name);
	found = 1;
      }
      }
    }
  freeifaddrs(addrs);
  if (!found) {
	  printf("No found IP!");
	  return 1;
  }
 else return 0;
}
