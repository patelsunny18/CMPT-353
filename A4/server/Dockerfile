FROM node:latest

COPY package.json /usr/src
WORKDIR /usr/src
RUN npm install
ENV PATH /usr/src/node_modules/.bin/:$PATH

WORKDIR /usr/src/app
EXPOSE 8080
CMD ["npx", "nodemon", "server.js"]