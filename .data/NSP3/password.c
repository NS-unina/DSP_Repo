#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void successo();

int main(int argc,char** argv){

	char password[16];
	printf("inserisci password: ");
	gets(password);
	if (strcmp(password,"networkSecurity")){
		printf("\nAccesso negato!\n");	
	}else{
		successo();	
	}
	return 0;
}


void successo(){
	printf("\nAccesso consentito\n");
	return ;
}
