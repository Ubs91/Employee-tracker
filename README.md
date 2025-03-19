Employee Tracker
Description
Employee Tracker is a command-line application that allows business owners to view and manage departments, roles, and employees in their company. This Content Management System (CMS) provides an intuitive interface for organizing and planning business operations through a PostgreSQL database.
Table of Contents

Installation
Usage
Features
Database Schema
Demo
Technologies Used
License

Installation

Clone the repository to your local machine
Navigate to the project directory
Install the required dependencies:
bashCopynpm install

Create a PostgreSQL database
Run the schema and seed files:
bashCopypsql -U your_username -d your_database -f db/schema.sql
psql -U your_username -d your_database -f db/seeds.sql

Configure the database connection in the connection.js file

Usage
To start the application, run:
bashCopynpm start
Follow the command-line prompts to:

View all departments, roles, or employees
Add departments, roles, or employees
Update employee roles

Features
The Employee Tracker allows users to:

View all departments: Display a formatted table showing department names and IDs
View all roles: Display job titles, role IDs, departments, and salaries
View all employees: Display employee IDs, names, job titles, departments, salaries, and managers
Add a department: Add a new department to the database
Add a role: Add a new role with title, salary, and department
Add an employee: Add a new employee with name, role, and manager
Update an employee role: Change an employee's role in the company

Bonus Features

Update employee managers
View employees by manager
View employees by department
Delete departments, roles, and employees
View total utilized budget by department (combined salaries)

Database Schema
The application uses a PostgreSQL database with the following schema:

Department Table

id: SERIAL PRIMARY KEY
name: VARCHAR(30) UNIQUE NOT NULL


Role Table

id: SERIAL PRIMARY KEY
title: VARCHAR(30) UNIQUE NOT NULL
salary: DECIMAL NOT NULL
department_id: INTEGER NOT NULL (Foreign Key)


Employee Table

id: SERIAL PRIMARY KEY
first_name: VARCHAR(30) NOT NULL
last_name: VARCHAR(30) NOT NULL
role_id: INTEGER NOT NULL (Foreign Key)
manager_id: INTEGER (Foreign Key, self-referencing)



Demo
View the demo video
Technologies Used

Node.js
Inquirer.js (v8.2.4)
PostgreSQL
pg (Node-Postgres)
Console.table (for data display)

License
© 2024 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.
