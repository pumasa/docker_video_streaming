FROM node:14

WORKDIR /app
COPY login.js ./
COPY package*.json ./
RUN npm install
RUN mkdir -p website/views website/public
COPY . .
WORKDIR /app

EXPOSE 3000
CMD ["node", "login.js"]
