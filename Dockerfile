# Step 1: Use the official Node.js image from Docker Hub as the base image
FROM node:16-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Build TypeScript files
RUN npm run build

# Step 7: Expose the port the app will run on
EXPOSE 3000

# Step 8: Run the app
CMD ["npm", "run", "dev", "src/index.ts"]


