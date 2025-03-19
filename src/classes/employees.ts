import { pool } from "./connections.js";
import inquirer from "inquirer";
export class Employee {
  employee_prompt: Array<object>;
  employee_roles_update: Array<object>;
  constructor() {
    this.employee_prompt = [
      {
        type: "input",
        name: "employee_first_name",
        message: "What is the first name of the employee?",
        validate: (ans: any) => {
          if (ans.trim().length > 0) {
            return true;
          } else {
            return "Please, enter a valid first name!";
          }
        },
      },
      {
        type: "input",
        name: "employee_last_name",
        message: "What is the last name of the employee?",
        validate: (ans: any) => {
          if (ans.trim().length > 0) {
            return true;
          } else {
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
            type : "list",
            name : "select_employee_update",
            message : "Which employee's role do you want to update?",
            choices : async () => (await this.select_manager_name()).filter((element:string) => element !== "None")


        },
        {
            type : "list",
            name : "select_role_update",
            message : "Which role do you want to assign selected employee?",
            choices : async () => await this.select_role_title()
        },
    ]
  }

  view_all_employees = async (): Promise<Array<string> | null> => {
    try {
      const query_ = `SELECT * FROM employee;`;
      const result = await pool.query(query_);
      console.table(result.rows);
      return result.rows;
    } catch (error: any) {
      console.error(`❌ Error selecting from employee table:`, error.message);
      return null;
    }
  };

  private select_role_title = async (): Promise<Array<string> | null> => {
    try {
      const query_ = `SELECT title FROM roles;`;
      const result = await pool.query(query_);
      return result.rows.map((element: any) => element.title);
    } catch (error: any) {
      console.error(
        `❌ Error selecting titles from roles table:`,
        error.message
      );
      return null;
    }
  };

  private select_manager_name = async (): Promise<Array<string>> => {
    try {
      const query_ = `SELECT first_name, last_name FROM employee;`;
      const result = await pool.query(query_);
      const arr_ = result.rows.map((element: any) =>
        [element.first_name, element.last_name].join(" ")
      );
      arr_.push("None");
      return arr_;
    } catch (error: any) {
      console.error(
        `❌ Error selecting titles from roles table:`,
        error.message
      );
      return ["null"];
    }
  };

  private select_manager_id = async (
    first_name: string,
    last_name: string
  ): Promise<number> => {
    try {
      const query_ = `SELECT id FROM employee where first_name = $1 and last_name = $2 limit 1;`;
      const result = await pool.query(query_, [first_name, last_name]);
      return Number(result.rows[0].id);
    } catch (error: any) {
      console.error(
        `❌ Error selecting id from employee table:`,
        error.message
      );
      return -1;
    }
  };

  private select_role_id = async (title: string): Promise<number> => {
    try {
      const query_ = `SELECT id FROM roles WHERE title = $1 limit 1;`;
      const result = await pool.query(query_, [title]);
      return Number(result.rows[0].id);
    } catch (error: any) {
      console.error(`❌ Error selecting id from roles table:`, error.message);
      return -1;
    }
  };

  private insert_into_employee = async (
    first_name: string,
    last_name: string,
    role_id: number,
    manager_id: number | null
  ): Promise<boolean | null> => {
    try {
      const query_ = `insert into employee (first_name, last_name, role_id, manager_id) values ($1, $2, $3, $4);`;
      const result = await pool.query(query_, [
        first_name,
        last_name,
        role_id,
        manager_id,
      ]);
      return true;
    } catch (error: any) {
      console.error(`❌ Error selecting id from roles table:`, error.message);
      return null;
    }
  };

  add_employee = async (): Promise<void> => {
    const answer = await inquirer.prompt(this.employee_prompt);

    const role_id = await this.select_role_id(answer.employee_role);
    if (answer.employee_manager == "None") {
      await this.insert_into_employee(
        answer.employee_first_name,
        answer.employee_last_name,
        role_id,
        null
      );
    } else {
      const manager_id = await this.select_manager_id(
        answer.employee_manager.split(" ")[0],
        answer.employee_manager.split(" ")[1]
      );
      await this.insert_into_employee(
        answer.employee_first_name,
        answer.employee_last_name,
        role_id,
        manager_id
      );
    }

    console.log(answer);
  };

  update_employee = async () : Promise<void> => {
    const answer = await inquirer.prompt(this.employee_roles_update);
    const role_id = await this.select_role_id(answer.select_role_update);
    const query_ = `update employee set role_id = $1 where first_name = $2 and last_name = $3;`
    try {
        await pool.query(query_,[role_id, answer.select_employee_update.split(" ")[0],answer.select_employee_update.split(" ")[1]]);
        
    } catch (error:any) {
        console.error("Unable to update role from employee table: ", error.message);
    }
    console.log(answer);
  };

 
}
