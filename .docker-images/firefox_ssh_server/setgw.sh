#!/bin/bash
# Author:       giper
# Email:        g.per45@gmail.com
# Date:        	 
# Usage:        setgw.sh  [--gw=namegateway]
# Description:
# 
#
#


usage() {
echo $1
echo "Usage setgw.sh [--gateway val] "
exit 1
}

GATEWAY_BOOL=false

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
    gateway)
    GATEWAY="${!OPTIND}"; OPTIND=$(( $OPTIND + 1 ))
    [[ ! -z "${GATEWAY// }" ]] && GATEWAY_BOOL=true || usage 'Empty Name'
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

#assertNoSpaces "$GATEWAY"

if [ $GATEWAY_BOOL != true ] ; then
	usage 'no gateway';
fi

route add default gw $GATEWAY
