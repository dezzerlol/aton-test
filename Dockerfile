FROM node:latest

WORKDIR /user/src/aton-test-frontend

COPY . .

RUN chmod -R 777 /user/src/aton-test-frontend

RUN yarn

RUN yarn build

USER node

CMD ["yarn", "preview"]

