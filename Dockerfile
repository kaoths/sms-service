FROM node:12-alpine
WORKDIR /server
COPY . .
RUN yarn install && yarn build
CMD [ "yarn", "start:prod" ]