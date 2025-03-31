#!/bin/bash
if [[ $(uname) == "Darwin" && $(uname -m) == "arm64" ]]; then
  ARCH="linux/arm64"
else
  ARCH="linux/amd64"
fi

docker buildx build --load --platform=linux/arm64 . -t nsunina/iplog:1.0