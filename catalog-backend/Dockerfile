FROM node:14

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn config set strict-ssl false
RUN yarn install

COPY . .

EXPOSE 3331

CMD [ "yarn", "start:prod" ]