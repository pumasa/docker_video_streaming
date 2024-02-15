FROM node:14

WORKDIR /app
COPY login.js ./
COPY package*.json ./
COPY website /website 
RUN npm install
COPY . .

EXPOSE 3000
CMD ["node", "login.js"]
