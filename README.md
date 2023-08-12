# Task Management System

This repository contains a project that includes a backend REST API developed in ASP .NET Core 5 and a corresponding frontend application on React. The project focuses on implementing user registration, authentication, and basic task management functionalities.

## Backend Overview

The backend is built using ASP .NET Core 5 and interacts with a database to store user and task data. It utilizes JSON Web Tokens (JWT) for authentication.

### Technologies Used

- ASP .NET Core 5
- Entity Framework Core
- SQL Server (or your chosen database)
- JSON Web Tokens (JWT)
- Password Hashing

### Setup

1. Clone this repository to your local machine.
2. Open the backend solution in your preferred development environment.
3. Configure the database connection in `appsettings.json`.
4. Run the migration to create the database schema: `dotnet ef database update`.
5. Build and run the API.

### API Endpoints

- **POST /register**
  - Request Body: `{ "email": "user@domain.com", "password": "password" }`
  - Response: `{ "user": { "id": 1, "email": "user@domain.com", "created_at": "2023-08-13T12:34:56Z", "updated_at": "2023-08-13T12:34:56Z" } }`

- **POST /login**
  - Request Body: `{ "email": "user@domain.com", "password": "password" }`
  - Response: `{ "jwt": "JWT_TOKEN_HERE" }`

- **GET /user**
  - Headers: `Authorization: Bearer <JWT_TOKEN>`
  - Response: `{ "user": { "id": 1, "email": "user@domain.com" } }`

- **POST /create-task**
  - Headers: `Authorization: Bearer <JWT_TOKEN>`
  - Request Body: `{ "name": "Task name" }`
  - Response: `{ "task": { "id": 1, "name": "Task name" } }`

- **GET /list-tasks**
  - Headers: `Authorization: Bearer <JWT_TOKEN>`
  - Response: `{ "tasks": [{ "id": 1, "name": "Task name" }, { "id": 2, "name": "Second task" }] }`
 
- **POST /delete-tasks**
  - Headers: `Authorization: Bearer <JWT_TOKEN>`
  - Request Body: `{ "ids": [1,2,3] }`
  - Response: `{ "Message": "Tasks Deleted Successfully"}`

## Frontend Overview

The frontend is a web application built using React and Tailwind. It provides a user-friendly interface for interacting with the API.

### Technologies Used

- React (or your preferred front-end framework)
- Tailwind

### Setup

1. Navigate to the frontend directory in this repository.
2. Install dependencies using your package manager: `npm install` or `yarn install`.
3. Configure the API endpoint in your front-end code.
4. Build and run the front-end application.

### Pages

- `/login`: User can login with valid credentials.
- `/register`: User can create an account.
- `/`: Redirects to `/list-tasks`.
- `/list-tasks`: Lists all tasks as individual cards.
- `/create-task`: Allows users to add new tasks and redirects to `/list-tasks`.
- `/bulk-delete`: Lists all tasks with checkboxes for bulk deletion. Implements "Soft Delete" functionality.

## GitHub Repository

The project code is available in the [GitHub repository](https://github.com/ishahanuddin/task-generator). You can find the backend and frontend code in their respective directories. Feel free to explore, contribute, and provide feedback.

For questions or assistance, please contact [ishahanuddin@gmail.com].
