FROM node:18-alpine as base

WORKDIR /rinha

COPY package.json /rinha/

RUN yarn install

COPY . /rinha/

EXPOSE 3000
EXPOSE 80

CMD [ "yarn", "dev" ]