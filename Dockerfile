FROM node:latest

WORKDIR /app

COPY /node_modules ./node_modules
COPY /package*.json ./
COPY /yarn.lock ./
COPY /dist ./dist

EXPOSE 3000

CMD [ "yarn", "serve:prod" ]