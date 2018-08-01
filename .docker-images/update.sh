update_image() {
cd $1; docker build -t $2 .
cd ..
}

pull_image() {
  # If doesn't exists pull
 if [ -z "$(docker images | grep -w "$1")" ]; then
  echo "Pulling $1..."
  docker pull $1
  fi
}
# Built images
# update_image dockersecplayground_alpine dockersecplayground/alpine:latest
