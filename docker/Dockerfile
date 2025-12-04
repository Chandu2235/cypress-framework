FROM node:18-alpine

WORKDIR /app

# Install dependencies
RUN apk add --no-cache \
    chromium \
    firefox \
    xvfb \
    x11-server-xvfb

# Copy package files
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy test files
COPY . .

# Create reports directory
RUN mkdir -p cypress/reports cypress/screenshots cypress/videos

# Run tests
CMD ["npm", "run", "test"]
