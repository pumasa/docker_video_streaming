FROM node:14

WORKDIR /app
COPY storage.js ./
COPY package*.json ./
RUN npm install
COPY . .
RUN mkdir -p /uploads
WORKDIR /app

EXPOSE 3002
CMD [ "node", "storage.js" ]
