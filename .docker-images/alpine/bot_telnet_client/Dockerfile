FROM nsunina/alpine:v1.0
ENV ENV=/root/.ashrc
RUN  apk --update add bash \
    &&  echo "alias sh=bash" > "$ENV"
RUN  apk --update add curl wget lftp heimdal-telnet tcpdump
COPY telnet_client.sh /telnet_client.sh
LABEL type=host actions.bot_telnet_client.command=/telnet_client.sh actions.bot_telnet_client.backgroundMode=true actions.bot_telnet_client.description=A telnet client, repeats a telnet request  actions.bot_telnet_client.args.ip_telnet_server.val= actions.bot_telnet_client.args.ip_telnet_server.type=text actions.bot_telnet_client.args.name.val= actions.bot_telnet_client.args.name.type=text actions.bot_telnet_client.args.password.val= actions.bot_telnet_client.args.password.type=text actions.bot_telnet_client.args.commands.val=ls actions.bot_telnet_client.args.commands.type=text
