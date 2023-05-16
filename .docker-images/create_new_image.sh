function usage {
    echo "Usage: create_new_image.sh <base-image> <lab-name> <image-name> <version-image>"
    exit 1
}

if [ $# -ne 3 ]
then 
    usage
fi

c