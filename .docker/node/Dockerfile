FROM node:20-slim

WORKDIR /var/www/html
COPY . .

RUN yarn install
CMD [ "yarn", "run", "dev" ]
