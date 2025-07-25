# Use Node.js LTS Alpine base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy dependency files and install
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose the port
EXPOSE 8080

# Start the app
CMD ["npm", "run", "dev"]
