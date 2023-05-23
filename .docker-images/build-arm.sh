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
    docker buildx build --platform linux/arm64 -t $image:$VERSION $NOCACHE --output type=docker .
    cd -
}


while read -r line; do

    image=$(echo $line | cut -d',' -f1)
    path=$(echo $line | cut -d',' -f2)
    echo "Build $image"
    build $image $path

done < list.txt


