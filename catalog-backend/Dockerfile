FROM node:14-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn config set strict-ssl false
RUN yarn install
RUN yarn build

COPY . .

EXPOSE 3331

CMD [ "yarn", "start:prod" ]