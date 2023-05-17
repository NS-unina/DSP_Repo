#!/bin/bash
# Author:       giper
# Email:        g.per45@gmail.com
# Date:        	 
# Usage:        telnet_client.sh [--name=val] [ --password=val]
# Description:


usage() {
echo $1
echo "Usage telnet_client.sh [--name=val] [ --password=val] [--commands=commands] [--ip_telnet_server=ip_telnet_server]"
 
exit 1
}


NAME_BOOL=false
COMMANDS_BOOL=false
TELNET_SERVER_BOOL=false
PASSWORD_BOOL=false


optspec=":-:"
while getopts "$optspec" optchar; do
  case "${optchar}" in
  -)
    case "${OPTARG}" in
    name)
    NAME="${!OPTIND}"; OPTIND=$(( $OPTIND + 1 ))
    NAME_BOOL=true
    ;;
    password)
    PASSWORD="${!OPTIND}"; OPTIND=$(( $OPTIND + 1 ))
    PASSWORD_BOOL=true
    ;;
    ip_telnet_server)
    TELNET_SERVER="${!OPTIND}"; OPTIND=$(( $OPTIND + 1 ))
    TELNET_SERVER_BOOL=true
    ;;
    commands)
    COMMANDS="${!OPTIND}"; OPTIND=$(( $OPTIND + 1 ))
    COMMANDS_BOOL=true
    ;;
    *)
    usage
    ;;
    esac;;
  *)
    usage
    ;;
  esac
done

if [ $NAME_BOOL != true ] ; then
	usage 'no name';
fi
if [ $COMMANDS_BOOL != true ] ; then
	usage 'no command';
fi
if [ $TELNET_SERVER_BOOL != true ] ; then
	usage 'no telnet sever';
fi
if [ $PASSWORD_BOOL != true ] ; then
	usage 'no password';
fi


while true; do

	eval "{ echo; 
		sleep 3;
		echo $NAME ; 
		sleep 1; 
		echo $PASSWORD ; 
		sleep 1; 
		echo $COMMANDS ; 
		sleep 20; }" | telnet $TELNET_SERVER



done;
