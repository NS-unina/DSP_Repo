#!/usr/bin/env bash
cd /app/
npm install --quiet 
/wait-for-it.sh MySQLServer:3306 -- npm run start