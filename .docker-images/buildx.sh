#!/bin/bash

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
    docker buildx build --platform linux/amd64,linux/arm64/v8  -t $image:$VERSION $NOCACHE --push .
    cd -
}

FILE=${1:-list.txt}

while read -r line; do

    image=$(echo $line | cut -d',' -f1)
    path=$(echo $line | cut -d',' -f2)
    echo "Build $image"
    build $image $path

done < $FILE


