const fs = require("fs");
const db = require("./db/connection");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const newEmployee = [];
const newEmployeeRole = [];

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
      console.log(answer);
      switch (answer.startMenuQuestion) {
        case "view all departments":
          allDepartments();
          break;

       case "view all roles":
          allRoles();
          break;

        case "view all employees":
          AllEmployees();
          break;

        case "add a department":
          addDepartment()
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
// add a role questions
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
        `INSERT INTO role SET ?`,
        {
          title: answers.role,
          salary: answers.salary,
        },
        (err) => {
          if (err) throw err;
          console.log("added new role");
          console.table(answers);
          startQuestions();
        }
      );
    });
}
// add a Department

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of thr department?",
      },
    ])
    .then((answers) => {
      connection.query(
        `INSERT INTO department SET ?`,
        {
          name: answers.department,
        },
        (err) => {
          if (err) throw err;
          console.log("added new department");
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
//   ]).then ((inputs) => {
//     console.log("added employee", inputs)
//     db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ?", [inputs.first_name, inputs.last_name, inputs.role_id, inputs.manager_id])
//   }).then ((result) =>{
//     console.log(result)
//   }).catch ((err) => console.error(err))
// }

//add to empty array
// const query = "SELECT first_name FROM employee";
// connection.query(query, (err, res) => {
//   if (err) throw err;
//   res.forEach(({ first_name }) => {
//     newEmployee.push(first_name);
//   });
// });
// newEmployeeRole = [];
// const query2 = `SELECT title FROM role`;
// connection.query(query2, (err, res) => {
//   if (err) throw err;
//   res.forEach(({ title }) => {
//     roleArray.push(title);
//   });
// });

const updateEmployeeRoleList = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeNew",
        choices: newEmployee,
        message: "who(lucky one) a new employee is?",
      },
      {
        type: "input",
        name: "roleNew",
        choices: newEmployeeRole,
        message: "What role would you like for your employee?",
      },
    ])
    .then((answers) => {
      connection.query(
        `UPDATE role SET title = ? WHERE first_name = ?`,
        {
          title: answers.roleNew,
          first_name: answers.employeeNew,
        },
        (err) => {
          if (err) throw err;
          console.log("update an employee role");
          console.table(answers);
          startQuestions();
        }
      );
    });
};
// All functions to use for manipulating MySQL database
const viewRoleList = () => {
  const result = inquirer.prompt(addRole);
  const sql = `INSERT INTO role (title, salary, department_id)
    VALUES (?,?,?)`;
  const params = [result.title, result.salary, result.department];

  db.query(sql, params, function (err, results) {
    console.log("");
    console.table(results);
  });
};

const viewDepartmentList = async () => {
  const sql = `INSERT INTO department (name)
    VALUES (?)`;
  const params = [result.name];

  db.query(sql, params, function (err, results) {
    console.log("");
    console.table(results);
  });
};

// const viewEmployee = (firstName) => {
//   const sql = `SELECT FROM employee WHERE employee.first_name = ?`;
  // const params = [
  //   result.first_name,
  //   result.last_name,
  //   result.role_id,
  //   result.manager_id,
  // ];
  // return connection
  //   .promise()
  //   .query(sql, firstName)
  //   .then((result) => console.table(result))
  //   .catch((err) => console.error(err));
  // connection.query(query, (err, res) =>{
  //   if (err) throw err
  //   console.log("view all employees")
  //   console.table(res)
  //   startQuestions();
  // })

  //   db.query(sql, params, function (err, results) {
  //     console.log("");
  //     console.table(results);
  //   });
};

const AllEmployees = () => {
  const sql = `SELECT * FROM employee`;

  return connection
    .promise()
    .query(sql)
    .then((result) => console.table(result))
    .catch((err) => console.error(err));
};

const allDepartments = () => {
  const query = `SELECT name FROM departments`;
  db.query(query, (err, res) =>{
    if (err) throw err
    console.log("View all departments")
    console.table(res)
  })
  startQuestions()
};

//  function to view all roles
const allRoles = () => {
  const query = `SELECT title, salary, name FROM roles, departments where department_id = departments.id;`;
  db.query(query, (err, res) =>{
    if (err) throw err
    console.log("View all roles")
    console.table(res)
    startQuestions()
  })
  startQuestions();
};
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

