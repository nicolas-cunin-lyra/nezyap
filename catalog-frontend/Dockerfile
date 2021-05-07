FROM node:14-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn config set strict-ssl false
RUN yarn install

COPY . .
RUN chmod +x scripts/*

EXPOSE 2221

CMD ["./scripts/build_and_run.sh"]