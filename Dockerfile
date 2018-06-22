FROM node:7.9.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
RUN npm install request
RUN npm install discord.js
RUN npm install discord.js-commando
RUN npm install sqlite
# Bundle app source
 COPY . /usr/src/app


EXPOSE 8080
CMD [ "npm", "start" ]
