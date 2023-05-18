#!/bin/bash
# Author:       giper
# Email:        g.per45@gmail.com
# Date:        	 
# Usage:        adduser.sh [--name=val] [ --password=val]
# Description:


usage() {
echo $1
echo "Usage set_banner.sh [--banner BANNER] "
exit 1
}
BANNER_BOOL=false




optspec=":-:"
while getopts "$optspec" optchar; do
  case "${optchar}" in
  -)
    case "${OPTARG}" in
    banner)
    BANNER="${!OPTIND}"; OPTIND=$(( $OPTIND + 1 ))
    [[ ! -z "${BANNER// }" ]] && BANNER_BOOL=true || usage 'Empty banner?'
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

if [ $BANNER_BOOL != true ] ; then
	usage 'no banner';
fi
echo "ftpd_banner=$BANNER" >> /etc/vsftpd/vsftpd.conf
