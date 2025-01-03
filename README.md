# nodejs-microservice
Node.js Microservice with Koa, TypeORM, and TypeDI, it can be run locally or via Docker.

## Setting Up the Project

Follow these steps to set up the project locally:

### 1. Clone the Repository

Clone the repository using Git:

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies
Install the required dependencies using npm:

```bash
npm install
```

### 3. Run the Development Server

Start the development server with the following command:

```bash
npm run dev src/index.ts
```

The application will be available at http://localhost:3000.

### 4. Building and Running with Docker
If you want to build and run the application using Docker, follow these steps:

Build the Docker image using the following command:

```bash 
sudo docker build -t nodejs-microservice .
```

This will create a Docker image for the application with the tag nodejs-microservice.

Run the Docker Container, mapping the application port to 3000:

```bash
sudo docker run -p 3000:3000 nodejs-microservice
```

This will start the application inside a Docker container and expose it on port 3000. The application will be available at http://localhost:3000.
