#!/bin/bash

while read line
do
  # Check if the line starts with "VRFY"
  if [[ $line == "VRFY"* ]]; then
    # Extract the username after "VRFY" command
    username="${line#VRFY }"
    
    # Check if the username exists (replace this with your logic)
    if getent passwd "$username" > /dev/null 2>&1; then
      # User exists, send a positive response (250 OK)
      echo "250 $username exists"
    else
      # User doesn't exist, send a "550 User not found" response
      echo "550 $username does not exist"
    fi
  else
    # Pass other SMTP commands through
    echo "$line"
  fi
done

exit 0
