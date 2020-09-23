FROM node:10

WORKDIR /app

COPY package*.json ./

RUN npm i

EXPOSE 4000

COPY index.js ./
