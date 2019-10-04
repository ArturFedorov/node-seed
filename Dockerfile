FROM node:10.14-alpine

ARG NODE_ENV_VAR
WORKDIR /app

COPY /dist /app
COPY /package.json /app

# download all production dependencies
RUN npm install --only=prod

# set environment variable
ENV NODE_ENV=$NODE_ENV_VAR

CMD ["node", "server"]
