FROM node:20-slim AS base

RUN npm i -g pnpm
WORKDIR /var/www/html

RUN pnpm config set store-dir /root/.local/share/pnpm/store
EXPOSE 5173
CMD [ "pnpm", "run", "dev" ]