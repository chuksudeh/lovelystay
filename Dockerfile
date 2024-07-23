# Use the official Node.js image based on Alpine Linux
FROM node:alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install npm and dependencies
RUN npm install -g npm@latest
RUN npm install

# Copy the rest of the application code
COPY . .

# Install dev dependencies
RUN npm install --only=development

# Create a non-root user and set the user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Specify the command to run your application
CMD [ "npm", "run", "dev" ]
