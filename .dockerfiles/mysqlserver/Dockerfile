FROM mysql
LABEL MAINTEINER="antonioavolio18@gmail.com"
ENV MYSQL_DATABASE "Society"
ENV MYSQL_USER "administrator"
ENV MYSQL_PASSWORD "VeryComplicatedPasswordToGet"
ENV MYSQL_ROOT_PASSWORD "VeryComplicatedPasswordToGet"
COPY ./SetupDatabase/PopulateDatabase.sql /docker-entrypoint-initdb.d/1.sql
EXPOSE 3306