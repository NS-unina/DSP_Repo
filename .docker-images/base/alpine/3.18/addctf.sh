#!/bin/bash
# Author:       giper
# Email:        g.per45@gmail.com
# Date:        	 
# Usage:        adduser.sh [--name=val] [ --password=val]
# Description:


usage() {
echo $1
echo "Usage addctf.sh [--name NAME] [ --ctf CTF]"
exit 1
}
NAME_BOOL=false
CTF_BOOL=false

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
    username)
    NAME="${!OPTIND}"; OPTIND=$(( $OPTIND + 1 ))
    [[ ! -z "${NAME// }" ]] && NAME_BOOL=true || usage 'Empty Name'
    ;;
    ctf)
    CTF="${!OPTIND}"; OPTIND=$(( $OPTIND + 1 ))
    [[ ! -z "${CTF// }" ]] && CTF_BOOL=true || usage 'Empty CTF'
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

if [ $NAME_BOOL != true ] ; then
	usage 'no name';
fi
if [ $CTF_BOOL != true ] ; then
	usage 'no ctf';
fi

echo $CTF > /home/$NAME/secret
