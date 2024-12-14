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
    DB_NAME=recyclovision

CMD [ "node", "dist/app.js" ]