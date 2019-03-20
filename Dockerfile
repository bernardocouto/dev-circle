FROM node:10-alpine

ENV GRAPHQL_PORT=4000

ENV NEO4J_PASSWORD=
ENV NEO4J_URI=bolt://localhost:7687
ENV NEO4J_USER=neo4j

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "npm", "start" ]
