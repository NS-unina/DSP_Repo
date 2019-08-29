#!/bin/bash
# Author:       giper
# Email:        g.per45@gmail.com
# Date:        	 
# Usage:        adduser.sh [--name=val] [ --password=val]
# Description:


usage() {
echo $1
echo "Usage adduser.sh [--name val] [ --password val]"
exit 1
}
NAME_BOOL=false
PASSWORD_BOOL=false
function assertNoSpaces {
    if [[ "$1" != "${1/ /}" ]]
    then
	usage 'Parameter cannot have spaces';
    fi
}



optspec=":-:"
while getopts "$optspec" optchar; do
  case "${optchar}" in
  -)
    case "${OPTARG}" in
    name)
    NAME="${!OPTIND}"; OPTIND=$(( $OPTIND + 1 ))
    [[ ! -z "${NAME// }" ]] && NAME_BOOL=true || usage 'Empty Name'
    ;;
    password)
    PASSWORD="${!OPTIND}"; OPTIND=$(( $OPTIND + 1 ))
    [[ ! -z "${PASSWORD// }" ]] && PASSWORD_BOOL=true || usage 'Empty Password'
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

assertNoSpaces "$NAME"
assertNoSpaces "$PASSWORD"

if [ $NAME_BOOL != true ] ; then
	usage 'no name';
fi
if [ $PASSWORD_BOOL != true ] ; then
	usage 'no password';
fi

adduser -D $NAME
echo $NAME:$PASSWORD | chpasswd
