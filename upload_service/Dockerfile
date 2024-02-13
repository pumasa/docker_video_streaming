FROM node:14

WORKDIR /app
COPY upload.js ./
COPY package*.json ./
RUN npm install
COPY . .
WORKDIR /app

EXPOSE 3003
CMD [ "/usr/local/bin/node", "upload.js" ]
