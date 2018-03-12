FROM node:9.2.0-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY ./package.json .

RUN apk update && \
 apk add bash && \
 npm install sequelize-cli -g && \
 npm install --save .
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 3000
# If you want to run this App outside docker-compose, use:
# CMD [ "npm", "start" ]
