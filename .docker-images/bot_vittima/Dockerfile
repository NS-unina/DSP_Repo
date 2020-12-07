FROM alpine
ADD victim.sh /
ADD init.sh /
RUN chmod +x init.sh \
	&& chmod +x victim.sh
RUN apk update && sh /victim.sh
CMD ["sh","init.sh"]
EXPOSE 23
