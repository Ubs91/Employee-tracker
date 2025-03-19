# Employee Tracker

## Description

Employee Tracker is a command-line application that allows business owners to view and manage departments, roles, and employees in their company. This Content Management System (CMS) provides an intuitive interface for organizing and planning business operations through a PostgreSQL database.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Database Schema](#database-schema)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [License](#license)

## Installation

1. Clone the repository to your local machine
2. Navigate to the project directory
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Create a PostgreSQL database
5. Run the schema and seed files:
   ```bash
   psql -U your_username -d your_database -f db/schema.sql
   psql -U your_username -d your_database -f db/seeds.sql
   ```
6. Configure the database connection in the connection.js file

## Usage

To start the application, run:
```bash
npm start
```

Follow the command-line prompts to:
- View all departments, roles, or employees
- Add departments, roles, or employees
- Update employee roles

## Features

The Employee Tracker allows users to:

- **View all departments**: Display a formatted table showing department names and IDs
- **View all roles**: Display job titles, role IDs, departments, and salaries
- **View all employees**: Display employee IDs, names, job titles, departments, salaries, and managers
- **Add a department**: Add a new department to the database
- **Add a role**: Add a new role with title, salary, and department
- **Add an employee**: Add a new employee with name, role, and manager
- **Update an employee role**: Change an employee's role in the company

## Walkthrought Video

[View the demo video](https://app.screencastify.com/v3/watch/JFfmE6lUONq6idldl79T)

## Technologies Used

- Node.js
- Inquirer.js (v8.2.4)
- PostgreSQL
- pg (Node-Postgres)
- Console.table (for data display)




