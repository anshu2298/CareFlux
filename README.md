# Sakila Analytics Dashboard

## Setup Instructions

### 1. Requirements
- Node.js (version 18 or higher)
- npm
- MySQL Server with the Sakila database installed

### 2. Database Setup
1. Download the Sakila database from the MySQL website.
2. Import the database files into your local MySQL server.

### 3. Backend Setup
1. Go to the backend folder:
   ```cd backend```
2. Install the necessary packages:
   ```npm install```
3. Create a file named .env and add your database details:
   ```PORT=5000
      DB_HOST=localhost
      DB_USER=your_username
      DB_PASSWORD=your_password
      DB_NAME=sakila```
4. Start the backend:
   ```npm run dev```

### 4. Frontend Setup
1. Go to the frontend folder:
   ```cd frontend```
2. Install the necessary packages:
   ```npm install```
3. Start the dashboard:
   ```npm run dev```

## Technologies Used
- Frontend: React, Vite, Apollo Client, Recharts, CSS.
- Backend: Node.js, Apollo Server, GraphQL, Knex.js.
- Database: MySQL.

## Project Structure

- Frontend: A React application that displays charts and tables. It has a filter bar to change the data you see.
- Backend: A Node.js server that takes requests from the frontend and gets the right information from the database.



