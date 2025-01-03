# RecycloVision Backend

This is an API built with **Express** and **TypeScript** using **TypeORM** for database management.

## Prerequisites

- Node.js v20+
- Docker

## Setup

1. Clone the repository and navigate into the project directory.

```bash
# Run this command to clone the repository and navigate into it
git clone <repository-url>
cd <repository-directory>
```

2. Install dependencies:

```bash
# Run this command to install the required dependencies
npm install
```

3. Create a `.env` file with the following content:

```env
# Server port configuration
PORT=3000

# Database connection details
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=recyclovision@123456
DB_NAME=recyclovision
```

4. Run Docker for MySQL with this command:

```bash
# Use this command to start MySQL using Docker
docker-compose --project-name mysql up -d
```

5. Start the development server:

```bash
# Run this command to start the server in development mode
npm run dev
```

## Technologies Used

- **[Express](https://expressjs.com/)**: Web framework for building server-side applications.
- **[TypeScript](https://www.typescriptlang.org/)**: Provides type safety and advanced tooling for JavaScript.
- **[TypeORM](https://typeorm.io/)**: ORM for managing database interactions in TypeScript/JavaScript.
- **[MySQL](https://dev.mysql.com/doc/)**: Relational database management system.
- **[Docker](https://docs.docker.com/)**: Containerization platform to package and run applications.
