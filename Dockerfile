# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock file into the working dirctory as cache file
COPY package.json yarn.lock /app/

# Install the application dependencies
# RUN yarn install
RUN cd /app && yarn install --pure-lockfile

# Copy the application files into the working directory
COPY . /app

# exposed port
EXPOSE 8000

# Define the entry point for the container
CMD ["yarn", "start"]