# FROM alpine
# RUN mkdir /files
# VOLUME /files
# CMD ["tail", "-f", "/dev/null"]


FROM node:14

WORKDIR /app
COPY storage.js ./
COPY package*.json ./
RUN npm install
COPY . .
WORKDIR /app

RUN mkdir -p /app/uploads
EXPOSE 3002
CMD [ "node", "storage.js" ]

