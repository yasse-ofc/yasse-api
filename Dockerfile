# obtain base image from docker hub
FROM node

# change working directory to /app
WORKDIR /app

# Copy package.json first to avoid re-running npm install
COPY package.json /app 

RUN npm install

# Copying the code to the container created 
COPY . /app

# This command is for containers, 
# executed when a container is created
CMD ["npm","start"]