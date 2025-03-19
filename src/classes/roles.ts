import inquirer from 'inquirer';
import { pool } from './connections.js';


export class Roles {

    roles_columns : Array<object>;

    constructor() {

        this.roles_columns = [
            {
                type : "input",
                name : "role_name",
                message : "What is the name of the role?",
                validate : (answer : any) => {
                    if (answer.trim(" ").length > 0) {
                        return true;
                    } else {
                        return "You must input a valid role name!";
                    }
                }
            },
            {
                type : "number",
                name : "role_salary",
                message : "What is the salary of the role?",
                validate : (answer : any) => {
                    if (answer > 0) {
                        return true;
                    } else {
                        return "Salaries must be greater than 0";
                    }
                }
            },
            {
                type : "list",
                name : "role_department",
                message : "Which department does the role belong to?",
                choices : async () => await this.fetch_department()
            }
        ]
    }

    private fetch_department = async () : Promise<Array<string>> => {
        try {
            const query_ = `SELECT name FROM department;`;
            const result = await pool.query(query_);
            if (result.rows && result.rows.length > 0) {
                return result.rows.map((element : any) => element.name);
            }
            return ["NULL"];
        } catch (error : any) {
            console.error("Unable to fetch names from department: ", error.message);
            return ["NULL"];
        }
    };

    private get_department_id = async (name:string) : Promise<number> => {
        try {
            const query_ = `SELECT id FROM department WHERE name = $1 LIMIT 1;`;
            const result = await pool.query(query_,[name]);
            if (result.rows && result.rows.length > 0) {
                return result.rows[0].id;
            }
            return -1;
        } catch (error : any) {
            console.error("Unable to fetch names from department: ", error.message);
            return -1;
        }
    };

    view_all_roles = async () : Promise<void> => {
        try {
            const query_ = `SELECT * FROM roles;`;
            const result = await pool.query(query_);
            console.table(result.rows);
        } catch (error : any) {
            console.error("Unable to fetch names from department: ", error.message);
        }
    };

    private insert_role = async (title : string, salary : number, deprartment_id : number) : Promise<void> => {
        try {
            const query_ = `INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3);`;
            await pool.query(query_, [title, salary, deprartment_id]);
            console.log(`✅ Successfully added record to the roles table.`);
        } catch (error : any) {
            console.error("❌ Error adding record:", error.message);
        }
    };

    add_roles = async () : Promise<void> => {
        const answer = await inquirer.prompt(this.roles_columns);
        await this.insert_role(answer.role_name, answer.role_salary, await this.get_department_id(answer.role_department));

    };
}
