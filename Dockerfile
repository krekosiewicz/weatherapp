# Use an official Node runtime as a parent image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or npm-shrinkwrap.json) to the container
COPY package*.json ./
COPY .env ./
# Install dependencies, legacy peer deps are required for React 19 RC (Canary)
RUN npm install --legacy-peer-deps

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build your app
RUN npm run build

# The command to run your app
CMD ["npm", "run", "devServer"]
