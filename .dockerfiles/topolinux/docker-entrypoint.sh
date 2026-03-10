#!/bin/bash
set -euo pipefail

MYSQL_ROOT_PASSWORD="${MYSQL_ROOT_PASSWORD:-Admin2015}"
DB_NAME="${MYSQL_DB:-web_db}"
DB_SEED_FILE="/docker-entrypoint-initdb.d/username.sql"
INIT_MARKER="/var/lib/mysql/.topolinux_initialized"

mkdir -p /run/mysqld
chown -R mysql:mysql /run/mysqld /var/lib/mysql

# PHP mysqli with host=localhost may use a compiled default socket path.
ln -sf /run/mysqld/mysqld.sock /var/run/mysqld/mysqld.sock || true
ln -sf /run/mysqld/mysqld.sock /tmp/mysql.sock || true

# Start MariaDB in background so we can prepare DB before Apache starts.
mariadbd --user=mysql --datadir=/var/lib/mysql --socket=/run/mysqld/mysqld.sock --pid-file=/run/mysqld/mysqld.pid &

# Wait until MariaDB accepts local socket connections.
until mysqladmin --socket=/run/mysqld/mysqld.sock -uroot ping --silent >/dev/null 2>&1; do
  sleep 1
done

if [ ! -f "$INIT_MARKER" ]; then
  mysql --socket=/run/mysqld/mysqld.sock -uroot <<SQL
ALTER USER 'root'@'localhost' IDENTIFIED BY '${MYSQL_ROOT_PASSWORD}';
CREATE DATABASE IF NOT EXISTS ${DB_NAME};
SQL

  mysql --socket=/run/mysqld/mysqld.sock -uroot -p"${MYSQL_ROOT_PASSWORD}" "${DB_NAME}" < "${DB_SEED_FILE}"
  touch "$INIT_MARKER"
fi

exec apache2-foreground
