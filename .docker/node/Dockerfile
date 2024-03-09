FROM node:20-slim
RUN npm install -g yarn

COPY package.json .

RUN yarn install
CMD [ "yarn", "run", "dev" ]
