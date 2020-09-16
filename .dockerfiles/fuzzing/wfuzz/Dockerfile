FROM dominicbreuker/wfuzz
RUN rm /wfuzz/wordlist/Injections/All_attack.txt 
ADD All_attack.txt /wfuzz/wordlist/Injections
ENTRYPOINT  tail -f /dev/null
