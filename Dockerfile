FROM node:latest

ENV FE "http://localhost:3001"

WORKDIR app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
