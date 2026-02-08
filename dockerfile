FROM node:25
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env.prod .env
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
# To build docker image run:
# sudo docker build -t api-green .