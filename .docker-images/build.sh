#!/bin/bash

BIBlue='\033[1;94m'       # Blue
NC='\033[0m' # No Color
set -e

log_colored() {
    echo -e "${BIBlue}$1${NC}"
}

# If you run with --no-cache the command is executed without caching
if echo "$*" | grep -q -- "--no-cache" ; then
    NOCACHE=--no-cache
else
    NOCACHE=''
fi

build() {
    image=$1
    path=$2
    cd $path
    VERSION=`cat VERSION`
    # docker buildx build --platform linux/amd64,linux/arm64 -t $image:$VERSION $NOCACHE .
    docker build --platform linux/amd64 -t $image:$VERSION $NOCACHE .
    cd -
}


while read -r line; do 

    image=$(echo $line | cut -d',' -f1)
    path=$(echo $line | cut -d',' -f2)
    log_colored "Build $image located in $path"
    build $image $path

done < list.txt


