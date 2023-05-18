FROM nsunina/alpine:3.18



RUN apk update && apk upgrade &&  apk --update --no-cache add vsftpd
EXPOSE 21
RUN echo "local_enable=YES" >> /etc/vsftpd/vsftpd.conf \
  && echo "chroot_local_user=YES" >> /etc/vsftpd/vsftpd.conf \
  && echo "allow_writeable_chroot=YES" >> /etc/vsftpd/vsftpd.conf \
  && echo "background=NO" >> /etc/vsftpd/vsftpd.conf \
  && echo "dirmessage_enable=YES" >> /etc/vsftpd/vsftpd.conf \
  && echo "max_clients=10" >> /etc/vsftpd/vsftpd.conf \
  && echo "write_enable=YES" >> /etc/vsftpd/vsftpd.conf \
  && echo "local_umask=022" >> /etc/vsftpd/vsftpd.conf \
  && echo "seccomp_sandbox=NO" >> /etc/vsftpd/vsftpd.conf \
  && echo "passwd_chroot_enable=yes" >> /etc/vsftpd/vsftpd.conf \
  && echo "anon_root=/srv" >> /etc/vsftpd/vsftpd.conf \
  && echo "pasv_enable=Yes" >> /etc/vsftpd/vsftpd.conf \
  && echo "listen_ipv6=NO" >> /etc/vsftpd/vsftpd.conf 


COPY set_banner.sh /set_banner.sh
COPY start_ftpd.sh /start_ftpd.sh

LABEL type="server" \
      actions.set_banner.command="/set_banner.sh " \ 
      actions.set_banner.description="Set a banner when user login" \ 
      actions.set_banner.args.banner.val="Hello" \
      actions.set_banner.args.banner.type="text" \
      actions.start_ftpd.command="/start_ftpd.sh " \
      actions.start_ftpd.description="Start the ftp server" \
      actions.start_ftpd.backgroundMode="true" \ 

