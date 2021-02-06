FROM node:latest

WORKDIR /usr/shared/app

COPY package*.json .

RUN npm install

COPY . .

CMD ["node", "index.js"]

