FROM node:18-alpine as base

WORKDIR /src

COPY package.json yarn.lock /src/

RUN yarn install --production \
  && mv node_modules node_modules_prod \
  && yarn

COPY . /src

RUN yarn build

FROM base as final

WORKDIR /rinha

COPY --from=base /src/build /rinha/build
COPY --from=base /src/node_modules_prod /rinha/node_modules
COPY package.json yarn.lock /rinha/

EXPOSE 3000

ENV PORT=3000

CMD node /rinha/build/server.js