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
pull_image nsunina/mirai_cnc:v1.0
pull_image nsunina/quagga:v1.1
pull_image nsunina/exabgp:3.4.20
pull_image nsunina/mirai_bot:v1.1
pull_image nsunina/fnm_mongodb:v1.0
pull_image nsunina/fastnetmon:v1.4
pull_image nsunina/alpine_netcat:v1.1
pull_image nsunina/smtp-user-enum:v1.0
pull_image nsunina/alpine_vrfy:v1.0
pull_image nsunina/postfix:v1.1
pull_image nsunina/alpine-dnsutils:v1.0
pull_image cosmicq/docker-bind:latest
pull_image nsunina/firefox:latest
pull_image nsunina/alpine-ssh-client:latest
pull_image nsunina/firefox-ssh-server:latest
