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
RUN mkdir -p /storage_service/uploads
WORKDIR /app

EXPOSE 3002
CMD [ "node", "storage.js" ]
