#!/bin/bash
# Author:       giper
# Email:        g.per45@gmail.com
# Date:
# Usage:        create_db.sh  [--db_name db_name]
# Description:
#
#
#


usage() {
echo $1
echo "Usage create_db.sh [--db_name=val] "
exit 1
}
DB_NAME_BOOL=false

#Arguments=( "$@" )
## Parse Parameters #
#for ARG in "${Arguments[@]}"; do
#  case $ARG in
#    --db_name=*)
#      DB_NAME=${ARG#*=}
#      ;;
#    *)
#      usage "Unknown Argument $ARG" ;;
#  esac
#done
#
#if [ $# -ne 1 ]; then
#   usage "args must be 1"
#fi

optspec=":-:"
while getopts "$optspec" optchar; do
  case "${optchar}" in
  -)
    case "${OPTARG}" in
    db_name)
    DB_NAME="${!OPTIND}"; OPTIND=$(( $OPTIND + 1 ))
    DB_NAME_BOOL=true
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
if [ $DB_NAME_BOOL != true ] ; then
	usage 'no command';
fi


# Execute the command
mysql -u dsp -p$MYSQL_ADMIN_PASS -e "create database ${DB_NAME}"
