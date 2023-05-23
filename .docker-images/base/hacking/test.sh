#/bin/bash
docker run -d \
  --name=dsptest \
  --security-opt seccomp=unconfined `#optional` \
  --cap-add=NET_ADMIN \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Etc/UTC \
  -p 13389:3389 \
  --restart unless-stopped \
  nsunina/hacking:1.0
