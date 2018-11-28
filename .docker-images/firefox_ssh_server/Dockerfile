FROM nsunina/firefox
RUN apk update && apk add openssh
COPY adduser.sh /adduser.sh
COPY setgw.sh /setgw.sh

LABEL \
  type="entry_point" \
    caps_add="NET_ADMIN" \
    privileged=true \
    actions.adduser.command="/adduser.sh" \ 
    actions.adduser.description="Add a new username : <name> <password> " \ 
    actions.adduser.args.name.val="user" \
    actions.adduser.args.name.type="text" \
    actions.adduser.args.name.rule.pattern="^[a-zA-Z0-9_-]+$" \
    actions.adduser.args.password.val="password" \
    actions.adduser.args.password.type="text" \
    actions.adduser.args.password.rule.pattern="^[a-zA-Z0-9_-]+$" \
    actions.setgw.command="/setgw.sh" \ 
    actions.setgw.description="Set default gateway  <name container gateway> " \ 
    actions.setgw.args.gateway.val="" \
    actions.setgw.args.gateway.type="text" \
    actions.setgw.args.gateway.rule.pattern="^[a-zA-Z0-9_-]+$" \
