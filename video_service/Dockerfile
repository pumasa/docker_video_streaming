FROM node:14

WORKDIR /app
COPY stream.js ./
COPY package*.json ./
RUN npm install
COPY . .
WORKDIR /app

EXPOSE 3001
CMD [ "/usr/local/bin/node", "stream.js" ]
