#!/bin/bash
source utils.sh

get_image_name() {
    echo $1
}
 
 build_base() {
    CURDIR=`pwd`
    for image in `ls -1 base/ | grep -v ^_`; do 
        VERSION=`cat base/$image/VERSION`
        IMAGE_NAME=`get_image_name $image` 
        # cd base/$image && docker build --no-cache -t $DOCKERHUB_REPO/$IMAGE_NAME:v$VERSION . 
        cd base/$image && docker build -t $DOCKERHUB_REPO/$IMAGE_NAME:v$VERSION . 
        cd $CURDIR

    done
 }


build_base