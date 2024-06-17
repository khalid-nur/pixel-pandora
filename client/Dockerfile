# Use the Node.js 20 image
FROM node:20

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies  in package.json
RUN npm install

# Copy all remaining application files into the container
COPY . .

# Expose port 5173 to allow connection to the application
EXPOSE 5173

# The command to start the application
CMD npm run dev