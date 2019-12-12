FROM node:10

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./



RUN npm install
# If you are building your code for production
RUN npm ci --only=production

COPY . .



CMD [ "node", "server.js" ] 


#docker run docker run -p 8080:8080 test_img