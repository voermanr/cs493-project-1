FROM node
LABEL authors="voermanr"

ENV PORT=6969

WORKDIR /usr/app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE ${PORT}

CMD [ "npm", "start" ]
