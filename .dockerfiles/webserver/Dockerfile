FROM node:18-slim
LABEL MAINTEINER="antonioavolio18@gmail.com"
ENV NODE_ENV "production"
COPY ./site /app/
COPY ./entrypoint.sh ./wait-for-it.sh /
ENTRYPOINT ["../entrypoint.sh"]
EXPOSE 8080