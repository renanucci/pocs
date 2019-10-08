FROM node:10

WORKDIR /usr/src/app
COPY . .

#ENV IP_REDIS_FIAP 192.168.99.100

RUN npm install

EXPOSE 8081
CMD [ "node", "helloworld.js" ]
