#!/bin/bash

if [ "$(uname)" == "Darwin" ]; then
  PLATFORM="linux/arm64"
else
  PLATFORM="linux/amd64"
fi


# If you run with --no-cache the command is executed without caching
if echo "$*" | grep -q -- "--no-cache" ; then
    NOCACHE=--no-cache
else
    NOCACHE=''
fi
file="${1:-list.txt}"
echo "[+] Build from $file"

build() {
    image=$1
    path=$2
    cd $path
    VERSION=`cat VERSION`
    echo "[+] docker buildx build $NOCACHE --load --platform=$PLATFORM -t $image:$VERSION  ."
    docker buildx build $NOCACHE --load --platform=$PLATFORM -t $image:$VERSION  .
    cd -
}


while read -r line; do

    image=$(echo $line | cut -d',' -f1)
    path=$(echo $line | cut -d',' -f2)
    echo "Build $image"
    build $image $path

done < $file


