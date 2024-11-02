# Sir Coffee

This project consists of a **NestJS server** using **PostgreSQL** as the database and a **React frontend** styled with **Tailwind CSS**. It is organized into two main directories:

- `client/`: Contains the React frontend application.
- `server/`: Contains the NestJS API.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Environment Variables](#environment-variables)
---

## Prerequisites

- **Node.js** (v19 or higher)
- **PostgreSQL** (ensure the server is running and you have created a database)
- **NPM** or **PNPM**

---

## Installation

### 1. Clone the Repository

```bash

git clone https://github.com/Abdulwahab0946/SCARAB-Dev.git
cd SCARAB-Dev

```

### 2. Install Dependencies

**Client:**

```bash
cd client
npm install
# or if using pnpm
pnpm install
```

**Server:**

```bash
cd ../server
npm install
# or if using pnpm
pnpm install
```

---

## Running the Project

### 1. Set Up the Database

Ensure your PostgreSQL server is running and you have created a database for this project. Add your database credentials to the server’s environment file as shown below.

### 2. Configure Environment Variables

Refer to [Environment Variables](#environment-variables) for details on setting up the environment files.

### 3. Run the Server

From the `server/` directory, run the following command to start the NestJS API:

```bash
npm run start:dev
# or if using pnpm
pnpm start:dev
```

The server should now be running at `http://localhost:3000`.

### 4. Run the Client

In a new terminal, go to the `client/` directory and start the React application:

```bash
npm start
# or if using pnpm
pnpm start
```

The client should now be running at `http://localhost:5173`.

---

## Environment Variables

### Server

Create a `.env` file inside the `server/` directory by updating the name `.env.copy` to `.env` 
and update the following variables:

```plaintext

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=coffee_db

```

### Client

Create a `.env` file inside the `client/` directory with the following variables:

```plaintext
VITE_API_URL=http://localhost:3000
```

Replace `VITE_API_URL` with the URL of your NestJS API if it is different from `http://localhost:3000`.
