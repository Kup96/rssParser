FROM node:16.14.2-alpine3.14

WORKDIR /server

COPY package*.json ./

RUN npm install
RUN npm install sequelize-cli -g
RUN npm install nodemon -g

COPY . .

EXPOSE 5002

CMD npm run start