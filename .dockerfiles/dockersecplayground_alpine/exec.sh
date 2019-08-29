#!/bin/bash
# Author:       giper
# Email:        g.per45@gmail.com
# Date:        	 
# Usage:       exec.sh [--command=command to execute] 
# Description:


usage() {
echo $1
echo "Usage exec.sh [--command=val] "
exit 1
}


COMMAND_BOOL=false
optspec=":-:"
while getopts "$optspec" optchar; do
  case "${optchar}" in
  -)
    case "${OPTARG}" in
    command)
    COMMAND="${!OPTIND}"; OPTIND=$(( $OPTIND + 1 ))
    COMMAND_BOOL=true
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
if [ $COMMAND_BOOL != true ] ; then
	usage 'no command';
fi


# Execute the command
/bin/sh -c "$COMMAND"
