FROM node:10

WORKDIR /usr/src/app

COPY . .

EXPOSE 8081
CMD [ "node", "helloworld.js" ]
