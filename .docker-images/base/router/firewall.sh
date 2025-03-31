#!/bin/bash
# Author:       giper
# Email:        g.per45@gmail.com
# Date:        	 
# Usage:        adduser.sh [--name=val] [ --password=val]
# Description:


usage() {
echo $1
echo "Usage firewall.sh [--rule RULE] "
exit 1
}
RULE_BOOL=false

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
    rule)
    RULE="${!OPTIND}"; OPTIND=$(( $OPTIND + 1 ))
    [[ ! -z "${RULE// }" ]] && RULE_BOOL=true || usage 'Empty Rule'
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

python firewall.py $RULE
