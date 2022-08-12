FROM node:18.6.0-alpine3.15

WORKDIR /app

RUN yarn global add pnpm

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "start"]