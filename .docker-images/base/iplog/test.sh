#!/bin/bash

docker run --cap-add=NET_ADMIN -it --rm nsunina/iplog:1.0 --entrypoint /bin/bash
