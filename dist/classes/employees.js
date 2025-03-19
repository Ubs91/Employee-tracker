import { pool } from "./connections.js";
import inquirer from "inquirer";
export class Employee {
    employee_prompt;
    employee_roles_update;
    constructor() {
        this.employee_prompt = [
            {
                type: "input",
                name: "employee_first_name",
                message: "What is the first name of the employee?",
                validate: (ans) => {
                    if (ans.trim().length > 0) {
                        return true;
                    }
                    else {
                        return "Please, enter a valid first name!";
                    }
                },
            },
            {
                type: "input",
                name: "employee_last_name",
                message: "What is the last name of the employee?",
                validate: (ans) => {
                    if (ans.trim().length > 0) {
                        return true;
                    }
                    else {
                        return "Please, enter a valid last name!";
                    }
                },
            },
            {
                type: "list",
                name: "employee_role",
                message: "What is the employee's role?",
                choices: async () => await this.select_role_title(),
            },
            {
                type: "list",
                name: "employee_manager",
                message: "What is the employee's manager?",
                choices: async () => await this.select_manager_name(),
            },
        ];
        this.employee_roles_update = [
            {
                type: "list",
                name: "select_employee_update",
                message: "Which employee's role do you want to update?",
                choices: async () => (await this.select_manager_name()).filter((element) => element !== "None")
            },
            {
                type: "list",
                name: "select_role_update",
                message: "Which role do you want to assign selected employee?",
                choices: async () => await this.select_role_title()
            },
        ];
    }
    view_all_employees = async () => {
        try {
            const query_ = `SELECT * FROM employee;`;
            const result = await pool.query(query_);
            console.table(result.rows);
            return result.rows;
        }
        catch (error) {
            console.error(`❌ Error selecting from employee table:`, error.message);
            return null;
        }
    };
    select_role_title = async () => {
        try {
            const query_ = `SELECT title FROM roles;`;
            const result = await pool.query(query_);
            return result.rows.map((element) => element.title);
        }
        catch (error) {
            console.error(`❌ Error selecting titles from roles table:`, error.message);
            return null;
        }
    };
    select_manager_name = async () => {
        try {
            const query_ = `SELECT first_name, last_name FROM employee;`;
            const result = await pool.query(query_);
            const arr_ = result.rows.map((element) => [element.first_name, element.last_name].join(" "));
            arr_.push("None");
            return arr_;
        }
        catch (error) {
            console.error(`❌ Error selecting titles from roles table:`, error.message);
            return ["null"];
        }
    };
    select_manager_id = async (first_name, last_name) => {
        try {
            const query_ = `SELECT id FROM employee where first_name = $1 and last_name = $2 limit 1;`;
            const result = await pool.query(query_, [first_name, last_name]);
            return Number(result.rows[0].id);
        }
        catch (error) {
            console.error(`❌ Error selecting id from employee table:`, error.message);
            return -1;
        }
    };
    select_role_id = async (title) => {
        try {
            const query_ = `SELECT id FROM roles WHERE title = $1 limit 1;`;
            const result = await pool.query(query_, [title]);
            return Number(result.rows[0].id);
        }
        catch (error) {
            console.error(`❌ Error selecting id from roles table:`, error.message);
            return -1;
        }
    };
    insert_into_employee = async (first_name, last_name, role_id, manager_id) => {
        try {
            const query_ = `insert into employee (first_name, last_name, role_id, manager_id) values ($1, $2, $3, $4);`;
            const result = await pool.query(query_, [
                first_name,
                last_name,
                role_id,
                manager_id,
            ]);
            return true;
        }
        catch (error) {
            console.error(`❌ Error selecting id from roles table:`, error.message);
            return null;
        }
    };
    add_employee = async () => {
        const answer = await inquirer.prompt(this.employee_prompt);
        const role_id = await this.select_role_id(answer.employee_role);
        if (answer.employee_manager == "None") {
            await this.insert_into_employee(answer.employee_first_name, answer.employee_last_name, role_id, null);
        }
        else {
            const manager_id = await this.select_manager_id(answer.employee_manager.split(" ")[0], answer.employee_manager.split(" ")[1]);
            await this.insert_into_employee(answer.employee_first_name, answer.employee_last_name, role_id, manager_id);
        }
        console.log(answer);
    };
    update_employee = async () => {
        const answer = await inquirer.prompt(this.employee_roles_update);
        const role_id = await this.select_role_id(answer.select_role_update);
        const query_ = `update employee set role_id = $1 where first_name = $2 and last_name = $3;`;
        try {
            await pool.query(query_, [role_id, answer.select_employee_update.split(" ")[0], answer.select_employee_update.split(" ")[1]]);
        }
        catch (error) {
            console.error("Unable to update role from employee table: ", error.message);
        }
        console.log(answer);
    };
}
