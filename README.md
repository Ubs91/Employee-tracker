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
  create table deparment (
 id serial primary key,
 name varchar(30) unique not null
);

create table role (
id SERIAL PRIMARY KEY,
title VARCHAR(30) UNIQUE NOT NULL,
salary DECIMAL NOT NULL,
department_id INTEGER NOT NULL);


create table employee (
id SERIAL PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER NOT NULL,
manager_id INTEGER );

ALTER TABLE deparment RENAME to department;

alter table roles
add constraint fk_department_id
FOREIGN key (department_id) references department(id) on delete cascade;

alter table employee
add constraint fk_role_id
foreign key (role_id) references roles(id) on delete cascade;

alter table employee
add constraint fk_employee_manager
foreign key (manager_id) references employee(id) on delete set null;

insert into department (name) values ('Marketing');
insert into department (name) values ('Engineering');
insert into department (name) values ('Sales'), ('Logistic');

select * from department;

insert into roles (title, salary, department_id) values ('Manager', 50000, 3);

select * from roles;

delete from department where id = 5;

insert into employee (first_name, last_name, role_id, manager_id) values ('Luis', 'Ubidia', 4, NULL);

insert into roles (title, salary, department_id) values ('Developer', 20000, 1),('Analyst', 10000, 4);

SELECT title FROM roles;

SELECT * FROM employee;

SELECT first_name, last_name FROM employee;

SELECT id FROM roles WHERE title = 'Developer' limit 1;

SELECT id FROM employee where first_name = 'Luis' and last_name = 'Ubidia' limit 1;

update employee set role_id = 4 where first_name = 'Pepe' and last_name = 'Ortiz';
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




