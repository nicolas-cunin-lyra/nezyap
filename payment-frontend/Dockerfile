FROM node:14

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn config set strict-ssl false
RUN yarn install

COPY . .

EXPOSE 2222

CMD [ "yarn", "start" ]