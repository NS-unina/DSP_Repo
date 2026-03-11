FROM ubuntu:24.04 AS base

ARG TARGETARCH

RUN apt-get update && apt-get install -y curl tar && rm -rf /var/lib/apt/lists/*


RUN case "$TARGETARCH" in \
      amd64) ARCH="amd64" ;; \
      arm64) ARCH="aarch64" ;; \
      *) echo "Unsupported arch: $TARGETARCH" && exit 1 ;; \
    esac && \
    mkdir -p /app && \
    curl -sSL "https://github.com/giper45/pitch-vulnerable/releases/download/v0.1.12/wasm-vulnerable-app-linux-${ARCH}.tar.gz" \
      -o /tmp/pitch.tar.gz && \
    tar -xzf /tmp/pitch.tar.gz -C /app && \
    rm /tmp/pitch.tar.gz && \
    find /app -name "wasmer.toml" -exec sed -i 's/127\.0\.0\.1/0.0.0.0/g' {} + && \
    ln -s /app/wasm-vulnerable-app-linux-${ARCH} /wasm-vulnerable-app

FROM base AS final


WORKDIR /wasm-vulnerable-app

ENTRYPOINT ["./run.sh"]
