FROM nsunina/smtp-user-enum:v1.0 AS smtp_user_enum

FROM nsunina/hacking-common:1.0

ARG DEBIAN_FRONTEND=noninteractive

COPY vrfy.py /vrfy.py
COPY --from=smtp_user_enum /usr/local/bin/smtp-user-enum.pl /usr/local/bin/smtp-user-enum.pl
COPY --from=smtp_user_enum /unix_users.txt /unix_users.txt

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
    netcat-openbsd \
    perl \
    python3 \
    vim \
 && ln -sf /usr/bin/nc /usr/local/bin/ncat \
 && chmod +x /vrfy.py /usr/local/bin/smtp-user-enum.pl \
 && rm -rf /var/lib/apt/lists/*
