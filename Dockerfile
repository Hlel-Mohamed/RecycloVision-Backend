FROM node:21.2.0-alpine

COPY . .

RUN npm i

RUN npm run build

EXPOSE 3000

ENV PORT=3000 \
    DB_HOST=mysql \
    DB_PORT=3306 \
    DB_USER=root \
    DB_PASSWORD=recyclovision@123456 \
    DB_NAME=recyclovision \
    JWT_SECRET=9bd113df7c98d986e606966f910c9e2c80a28027320ff07d2a8a0897a2233e4e

CMD [ "node", "dist/app.js" ]