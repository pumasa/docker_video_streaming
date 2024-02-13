FROM mysql:latest

ADD create_db.sql /docker-entrypoint-initdb.d/create_db.sql
RUN chmod -R 775 /docker-entrypoint-initdb.d

ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=nodelogin
ENV MYSQL_USER=sqluser
ENV MYSQL_PASSWORD=password

EXPOSE 3306
