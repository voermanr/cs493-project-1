FROM node
LABEL authors="voermanr"

WORKDIR /usr/app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 6969

CMD [ "npm", "start" ]
