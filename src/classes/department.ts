import { pool } from "./connections.js";
import inquirer from "inquirer";

export class Department {
  department_columns: Array<object>;

  constructor() {
    this.department_columns = [
      {
        type: "input",
        name: "departmentInsert",
        message: "What is the name of the department?",
        validate: (ans: any) => {
          if (ans.trim().length > 0) {
            return true;
          } else {
            return "Please, enter a valid department!";
          }
        },
      },
    ];
  }

  private insert_into_departments = async (
    title: string
  ): Promise<boolean | null> => {
    try {
      const query_ = `insert into department (name) values ($1);`;
      await pool.query(query_, [title]);
      return true;
    } catch (error: any) {
      console.error(`❌ Error selecting id from departments table:`, error.message);
      return null;
    }
  };

  view_all_departments = async (): Promise<Array<string> | null> => {
    try {
      const query_ = `SELECT * FROM department;`;
      const result = await pool.query(query_);
      console.table(result.rows);
      return result.rows;
    } catch (error: any) {
      console.error(
        `❌ Error selecting from departments table:`,
        error.message
      );
      return null;
    }
  };

  /*Here we should create our options for department table*/
  department_prompts = async (): Promise<void> => {
    const ans = await inquirer.prompt(this.department_columns);
    /*We only have one value to insert , so we will only handle 
        a single question on the prompt*/
    await this.insert_into_departments(ans.departmentInsert);
  };
}
