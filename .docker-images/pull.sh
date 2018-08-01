pull_image() {
  # If doesn't exists pull
 if [ -z "$(docker images | grep -w "$1")" ]; then
  echo "Pulling $1..."
  docker pull $1
  fi
}
# Built images
# pull_image dockersecplayground/alpine:v1.0
