#!/bin/bash
# Author:       giper
# Email:        g.per45@gmail.com
# Date:        	 
# Usage:        sql_to_db.sh  [--db_name=db_name]
# Description:


usage() {
echo $1
echo "Usage sql_to_db.sh [--db_name=val, --sql_file=val] "
exit 1
}
DB_NAME_BOOL=false
SQL_FILE_BOOL=false

optspec=":-:"
while getopts "$optspec" optchar; do
  case "${optchar}" in
  -)
    case "${OPTARG}" in
    db_name)
    DB_NAME="${!OPTIND}"; OPTIND=$(( $OPTIND + 1 ))
    DB_NAME_BOOL=true
    ;;
    sql_file)
    SQL_FILE="${!OPTIND}"; OPTIND=$(( $OPTIND + 1 ))
    SQL_FILE_BOOL=true
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

if [ $SQL_FILE_BOOL != true ] ; then
	usage 'no command';
fi
if [ $DB_NAME_BOOL != true ] ; then
	usage 'no command';
fi

#Operation
mysql -u dsp -p$MYSQL_ADMIN_PASS $DB_NAME < $SQL_FILE