#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc,char** argv){

	char buff[2];

	strcpy(buff,argv[1]);
	printf("Il tuo buffer contiene: %s \n",buff);
	return 1;

}
