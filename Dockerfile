# node base image
FROM node:13.12.0-alpine

#set working directory
RUN mkdir -p /usr/src/app/server
RUN mkdir -p /usr/src/app/ui
WORKDIR /usr/src/app/server/

# set up backend first
COPY server/package*.json /usr/src/app/server/

RUN npm install

# bring backend code in
COPY server/ /usr/src/app/server

# wooo now bring in the frontend
COPY ui/package*.json /usr/src/app/ui/
WORKDIR /usr/src/app/ui
RUN npm install

# bring frontend in
COPY ui/ /usr/src/app/ui


EXPOSE 8080
EXPOSE 3000
#CMD ["node", "--use_strict", "app.js"]
CMD ["npm", "start"]