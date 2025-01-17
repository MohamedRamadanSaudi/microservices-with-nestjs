# Microservices Project with NestJS, MongoDB, MySQL, and RabbitMQ

This project is a learning-oriented implementation of a microservices architecture using NestJS. It consists of two separate services:

1. **Main Service** (uses MongoDB with Mongoose)
2. **Admin Service** (uses MySQL with TypeORM)

Both services communicate with each other using RabbitMQ for message-based interaction.

---

## General Overview

This project demonstrates the following concepts:

- **Microservices Architecture**: Each service is designed as an independent unit responsible for a specific domain of the application.
- **Message Queue Integration**: RabbitMQ is used as the message broker for asynchronous communication between services.
- **Database Flexibility**: Different databases are used for each service to showcase polyglot persistence:
  - MongoDB (NoSQL) for the Main Service
  - MySQL (Relational) for the Admin Service
- **NestJS Framework**: A modular and scalable Node.js framework used for building efficient and reliable server-side applications.

---

## Project Structure

### Main Service

#### Features:

- Handles product data using MongoDB.
- Listens to events from the Admin Service via RabbitMQ.
- Provides endpoints to retrieve and update product data.
- Sends HTTP requests to other services when required.

#### Technologies:

- NestJS
- Mongoose
- MongoDB
- RabbitMQ
- Axios

#### Setup Instructions:

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Set Environment Variables**:
   Create a `.env` file with the following:
   ```env
   MONGO_URI=mongodb://localhost:27017/main_service
   RABBITMQ_URL=amqp://localhost:5672
   ```
3. **Run the Service**:
   ```bash
   npm run start:dev
   ```

#### API Endpoints:

| Method | Endpoint            | Description                   |
| ------ | ------------------- | ----------------------------- |
| GET    | `/product`          | Retrieve all products         |
| POST   | `/product/:id/like` | Increment likes for a product |

#### Event Handlers:

- **`product_created`**: Creates a product in MongoDB.
- **`product_updated`**: Updates a product in MongoDB.
- **`product_deleted`**: Deletes a product from MongoDB.

---

### Admin Service

#### Features:

- Handles product creation, updates, and deletions using MySQL.
- Emits events to RabbitMQ for the Main Service to consume.

#### Technologies:

- NestJS
- TypeORM
- MySQL
- RabbitMQ

#### Setup Instructions:

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Set Environment Variables**:
   Create a `.env` file with the following:
   ```env
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_USER=root
   MYSQL_PASSWORD=yourpassword
   MYSQL_DATABASE=admin_service
   RABBITMQ_URL=amqp://localhost:5672
   ```
3. **Run the Service**:
   ```bash
   npm run start:dev
   ```
   In another terminal:
   ```bash
   npm run listen
   ```

#### API Endpoints:

| Method | Endpoint            | Description                       |
| ------ | ------------------- | --------------------------------- |
| POST   | `/product`          | Create a new product              |
| GET    | `/product`          | Retrieve all products             |
| GET    | `/product/:id`      | Retrieve a specific product by ID |
| PATCH  | `/product/:id`      | Update a product                  |
| DELETE | `/product/:id`      | Delete a product                  |
| POST   | `/product/:id/like` | Increment likes for a product     |

#### Event Emitters:

- **`product_created`**: Emitted when a product is created.
- **`product_updated`**: Emitted when a product is updated.
- **`product_deleted`**: Emitted when a product is deleted.

---

## Running the Project

1. **Start RabbitMQ**:
   Make sure RabbitMQ is running on your system.
2. **Run the Main Service**:
   Navigate to the `main-service` directory and run:
   ```bash
   npm run start:dev
   ```
3. **Run the Admin Service**:
   Navigate to the `admin-service` directory and run in separated 2 terminals:
   ```bash
   npm run start:dev
   ```
   ```bash
   npm run listen
   ```
4. **Test the Endpoints**:
   Use a tool like Postman to interact with the services.
   you can just import "Endpoints.postman_collection.json" file to it.

---

## Notes

- This project is for **learning purposes only** and is not production-ready.
- It demonstrates fundamental microservices concepts such as:
  - Decoupled architecture
  - Asynchronous messaging
  - Database segregation

Feel free to modify and extend this project as you continue learning!
