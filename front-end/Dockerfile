FROM node:16.14-alpine

WORKDIR /front-end

COPY package*.json /

RUN npm install

COPY . ./

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]