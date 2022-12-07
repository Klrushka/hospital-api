FROM node:16.17.0

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3001

CMD [ "npm", "start" ]

