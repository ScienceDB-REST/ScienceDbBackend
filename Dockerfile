FROM node:9.11.1

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY ./package.json .

RUN apt-get update && \
 apt-get install -y bash && \
 npm install

# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 3000
# If you want to run this App outside docker-compose, use:
# CMD [ "npm", "start" ]
