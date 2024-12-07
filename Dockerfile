FROM node:21.2.0-alpine

COPY . .

RUN npm i

RUN npm run build

EXPOSE 3000

CMD [ "node", "app.js" ]