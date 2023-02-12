const fs = require("fs");
const db = require("./db/connection");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const employees = [];
const employeeRoles = [];
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "123741q",
  database: "employee_tracker",
});

const startQuestions = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "startMenuQuestion",
        message: "What would you like to do?",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
          "exit",
        ],
      },
    ])
    .then((answer) => {
      // console.log(answer);
      switch (answer.startMenuQuestion) {
        case "view all departments":
          allDepartments();
          break;

        case "view all roles":
          allRoles();
          break;

        case "view all employees":
          allEmployees();
          break;

        case "add a department":
          addDepartment();
          break;

        case "add a role":
          addRole();
          break;

        case "add an employee":
          addEmployee();
          break;

        case "update an employee role":
          updateEmployee();
          break;
        default:
          process.exit(0);
      }
    });
};

// view all departments
const allDepartments = () => {
  const query = `SELECT *
   FROM departments`;
  db.query(query, (err, res) => {
    if (err) throw err;
    console.log("View all departments");
    console.table(res);
    startQuestions();
  });
};

//  function to view all roles
const allRoles = () => {
  const query = `SELECT title, salary, name FROM roles, departments where department_id = departments.id;`;
  db.query(query, (err, res) => {
    if (err) throw err;
    console.log("View all roles");
    console.table(res);
    res.forEach((role) => {
      employeeRoles.push(role.title);
    });
    startQuestions();
  });
};
 
//  view all employees
const allEmployees = () => {
  const sql = `SELECT * FROM employees
  `;
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.log("View all employees");
    console.table(res);
    res.forEach((employee) => {
      employees.push(employee.first_name);
    });
    startQuestions();
  });
};
// 
// function view all employees
// const allEmployees = () =>{
//   const query = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, departments.name, roles.salary, CONCAT(manager.first_name,'', manager.last_name) AS manager
//   FROM employee 
//   LEFT JOIN employee manager ON manager.id = employee.manager_id
//   INNER JOIN roles ON employee.role_id = roles.id
//   INNER JOIN departments ON departments.id = roles.department_id;`
//   console.log(query)
//   connection.query(query, (err, res) =>{
//     if (err) throw err
//     console.log("View all employees")
//     console.table(res)
//     startQuestions();
//   }
// )};

// add a department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the department?",
      },
    ])
    .then((answers) => {
      connection.query(
        `INSERT INTO departments (name)
      VALUES (?)`,
        answers.name,
        (err) => {
          if (err) throw err;
          console.log("added new department");
          startQuestions();
        }
      );
    });
}

// add a role 
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the name of the role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role?",
      },
      {
        type: "input",
        name: "department",
        message: "Which department does the role belong to? ",
      },
    ])
    .then((answers) => {
      connection.query(
        `INSERT INTO roles (title, salary, department_id) 
        VALUES (?, ?, ?)`,
        [answers.title, answers.salary, answers.department],
        (err) => {
          if (err) throw err;
          console.log("added new role");
          console.table(answers);
          startQuestions();
        }
      );
    });
}
// add an employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?",
      },
      {
        type: "input",
        name: "role_id",
        message: "What is the employee's role?",
      },
      {
        type: "input",
        name: "manager_id",
        message: "Who is the employee's manager?",
      },
    ])
    .then((answers) => {
      connection.query(
        `INSERT INTO employee SET ?`,
        {
          first_name: answers.firstName,
          last_name: answers.lastName,
          role_id: answers.roleId,
          manager_id: answers.managersId,
        },
        (err) => {
          if (err) throw err;
          console.log("added employee");
          console.table(answers);
          startQuestions();
        }
      );
    });
}

const updateEmployee = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "firstName",
        choices: employees,
        message: "who an employee is?",
      },
      {
        type: "list",
        name: "roleNew",
        choices: employeeRoles,
        message: "What role would you like for your employee?",
      },
    ])
    .then((answers) => {
      console.log(answers);
      let roleId;
      const roleSQL = `select id from roles where title = ?`;
      connection.query(roleSQL, [answers.roleNew], (err, res) => {
        if (err) throw err;
        console.log(res);
        roleId = res[0].id;
        const updateEmployeeSQL = `update employees set role_id = ? where first_name =?`;
        connection.query(
          updateEmployeeSQL,
          [roleId, answers.firstName],
          (err) => {
            if (err) throw err;
            console.log("update an employee role");
            startQuestions();
          }
        );
      });
    });
};
// All functions to use for manipulating MySQL database
// const viewRoleList = () => {
//   const result = inquirer.prompt(addRole);
//   const sql = `INSERT INTO role (title, salary, department_id)
//     VALUES (?,?,?)`;
//   const params = [result.title, result.salary, result.department];

//   db.query(sql, params, function (err, results) {
//     console.log("");
//     console.table(results);
//   });
// };

// const viewDepartmentList = async () => {
//   const sql = `INSERT INTO department (name)
//     VALUES (?)`;
//   const params = [result.name];

//   db.query(sql, params, function (err, results) {
//     console.log("");
//     console.table(results);
//   });
// };

const run = () => {
  startQuestions();
};
const initialDb = () => {
  const schema = fs.readFileSync("./db/schema.sql").toString();
  const seeds = fs.readFileSync("./db/seed.sql").toString();
  db.query(schema);
  db.query(seeds);
};
initialDb();
run();
