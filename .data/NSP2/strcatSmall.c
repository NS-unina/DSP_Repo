#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc,char** argv){

	char buff[10];
	buff[0] = 's';
	buff[1] = 't';
	buff[2] = 'r';
	buff[3] = ':';
	strcat(buff,argv[1]);
	printf("%s \n",buff);
	return 1;

}

