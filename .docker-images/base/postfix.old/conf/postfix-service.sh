#!/bin/bash

function log {
  echo `date` $ME - $@
}

function serviceConf {
  # Check hostname variable
  if [[ ! ${HOSTNAME} =~ \. ]]; then
    HOSTNAME=$HOSTNAME.$DOMAIN
  fi

  # Substitute configuration
  for VARIABLE in `env | cut -f1 -d=`; do
    VAR=${VARIABLE//:/_}
    sed -i "s={{ $VAR }}=${!VAR}=g" /etc/postfix/*.cf
  done

  # Override Postfix configuration
  if [ -f /overrides/postfix.cf ]; then
    while read line; do
      [[ -n "$line" && "$line" != [[:blank:]#]* ]] && postconf -e "$line"
    done < /overrides/postfix.cf
    echo "Loaded '/overrides/postfix.cf'"
  else
    echo "No extra postfix settings loaded because optional '/overrides/postfix.cf' not provided."
  fi

  # Include table-map files
  if ls -A /overrides/*.map 1> /dev/null 2>&1; then
    cp /overrides/*.map /etc/postfix/
    postmap /etc/postfix/*.map
    rm /etc/postfix/*.map
    chown root:root /etc/postfix/*.db
    chmod 0600 /etc/postfix/*.db
    echo "Loaded 'map files'"
  else
    echo "No extra map files loaded because optional '/overrides/*.map' not provided."
  fi
}

function serviceStart {
  serviceConf
  # Actually run Postfix
  log "[ Starting Postfix... ]"
  /usr/sbin/postfix start-fg 
}

export DOMAIN=${DOMAIN:-"localdomain"}
export HOSTNAME=${HOSTNAME:-"localhost"}
export MESSAGE_SIZE_LIMIT=${MESSAGE_SIZE_LIMIT:-"50000000"}
export RELAYNETS=${RELAYNETS:-""}
export RELAYHOST=${RELAYHOST:-""}

serviceStart &>> /proc/1/fd/1
