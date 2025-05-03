# Base image with Node.js
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the frontend app (adjust for your framework if needed)
RUN npm run build

# Use a lightweight web server to serve the static files
# For React/Vue, you can use serve (install if needed)
RUN npm install -g serve

# Expose port 3000 (or whatever your frontend uses)
EXPOSE 3000

# Start the app using serve
CMD ["serve", "-s", "build", "-l", "3000"]
