import inquirer from 'inquirer';
import { Employee } from './classes/employees.js';
import { Roles } from './classes/roles.js';
import { Department } from './classes/department.js';
import { connectToDb } from './classes/connections.js';
const main_menu_options = [
    {
        type: "list",
        name: "main_menu",
        message: "What do you like to do?",
        choices: ["View All Employees", "Add Employee", "Update Employee Role", "View all Roles", "Add Role", "View All Departments", "Add Departments", "Quit"]
    }
];
const employee_ = new Employee();
const roles_ = new Roles();
const departments_ = new Department();
/*This will be the entry point of the application, here we will prompt our main menu*/
const options_ = async () => {
    const result = await inquirer.prompt(main_menu_options);
    switch (result.main_menu) {
        case "View All Employees":
            await employee_.view_all_employees();
            break;
        case "Add Employee":
            await employee_.add_employee();
            break;
        case "Update Employee Role":
            await employee_.update_employee();
            break;
        case "View all Roles":
            await roles_.view_all_roles();
            break;
        case "Add Role":
            await roles_.add_roles();
            break;
        case "View All Departments":
            await departments_.view_all_departments();
            break;
        case "Add Departments":
            await departments_.department_prompts();
            break;
        case "Quit":
            process.exit();
        default:
            console.log("Error");
            break;
    }
    await options_();
};
await connectToDb();
await options_();
