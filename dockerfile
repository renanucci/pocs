FROM node:10

WORKDIR /usr/src/app
COPY . .

# ENV IP_REDIS_FIAP meuredis

RUN npm install

EXPOSE 8081
CMD [ "node", "helloworld.js" ]
