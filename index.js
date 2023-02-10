// packages to run app
const inquirer = require('inquirer')
const mysql = require('mysql2');
const requireTable = require('console.table')
let employeesArray = [];
let rolesArray = [];

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123741q',
  database: 'employee_tracker'
});
connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  afterConnection();
});
afterConnection = () => {
  console.log("***********************************")
  console.log("*                                 *")
  console.log("*        EMPLOYEE MANAGER         *")
  console.log("*                                 *")
  console.log("***********************************")
  employeeUpdate();
};
// First question for Employers choice
const employeeUpdate = () => {
    inquirer.prompt ([
        {
            type:'list',
            name:'employeeChoice',
            message: "What would you like to do?",
            choices:['View all Employees', 
                      'View Departments',
                      'View Roles', 
                      'Add Employee',
                      'Add Departments',
                      'Add Roles',
                      'Update Employee Role',
                      'O bella ciao, bella ciao, bella ciao ciao ciao'
                    ]
        }
      
    ]).then((answers) => {
      const { choices } = answers;
        if (choices === 'View all Employees'){
          viewEmployees();
        }
        if (choices === 'View Departments'){
          viewDepartments();
        }
        if (choices === 'View Roles'){
          viewRoles();
        } 
        if (choices === 'Add Employee'){
          addEmployee();
        }
        if (choices === 'Add Departments'){
          addDepartment();
        }  
        if (choices === 'Add Role'){
          addRole();
        }
        if (choices === 'Update Employee Role'){
          updateEmployeeRole();
        }
      
      })
    };
      
    
// function to view all Employees information
viewEmployees = () => {
  console.log('all employees...\n'); 
  const sql = `SELECT employee.id, 
                      employee.first_name, 
                      employee.last_name, 
                      role.title, 
                      department.name AS department,
                      role.salary, 
                      CONCAT (manager.first_name, " ", manager.last_name) AS manager
                      FROM employee
                      LEFT JOIN role ON employee.role_id = role.id
                      LEFT JOIN department ON role.department_id = department.id
                      LEFT JOIN employee manager ON employee.manager_id = manager.id`;

  connection.promise().query(sql, (err, rows) => {
    if (err) throw err; 
    console.table(rows);
    employeeUpdate();
  });
};
// function to view all Departments
viewDepartments = () => {
  console.log('all departments...\n');
  const sql = `SELECT department.id AS id, department.name AS department FROM department`; 

  connection.promise().query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    employeeUpdate();
  });
};


//  function to view all roles
viewRoles = () => {
  console.log('all roles...\n');

  const sql = `SELECT role.id, role.title, department.name AS department
               FROM role
               INNER JOIN department ON role.department_id = department.id`;
  
  connection.promise().query(sql, (err, rows) => {
    if (err) throw err; 
    console.table(rows); 
    employeeUpdate();
  })
};
// function to add new employee
addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is employees first name?',
      name: 'firstName',
      validate: firstName => {
        if (firstName) {
            return true;
        } else {
            console.log('enter a first name');
            return false;
        }
      }
    },
    { 
      type: 'input',
      message: 'What is employees last name?',
      name: 'lastName',
      validate: lastName => {
        if (lastName) {
            return true;
        } else {
            console.log('enter a last name');
            return false;
        }
      }
    }
  ])
    .then(answer => {
      const params = [answer.fistName, answer.lastName]
  
      // grab roles from roles table
      const roleSql = `SELECT role.id, role.title FROM role`;
    
      connection.promise().query(roleSql, (err, data) => {
        if (err) throw err; 
        
        const roles = data.map(({ id, title }) => ({ name: title, value: id }));
  
        inquirer.prompt([
    {
      type: 'input',
      message: 'What is employees role id?',
      name: 'roleId',
      choices: roles
    }
  ])
  .then(roleChoice => {
    const role = roleChoice.role;
    params.push(role);

    const managerSql = `SELECT * FROM employee`;

    connection.promise().query(managerSql, (err, data) => {
      if (err) throw err;

      const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));

      // console.log(managers);

      inquirer.prompt([
        {
          type: 'list',
          name: 'manager',
          message: "Who is the employee's manager?",
          choices: managers
        }
      ])
        .then(managerChoice => {
          const manager = managerChoice.manager;
          params.push(manager);

          const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
          VALUES (?, ?, ?, ?)`;

          connection.query(sql, params, (err, result) => {
          if (err) throw err;
          console.log("employee has been added!")

          employeeUpdate();
    });
  });
});
});
});
});
};
    
// function to add department
addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What department would you like to add?',
      name: 'addDepartment',
      validate: addDepartment => {
        if (addDepartment) {
            return true;
        } else {
            console.log('department is?');
            return false;
        }
      }
    }
  ])
    .then(answer => {
      const sql = `INSERT INTO department (name)
                  VALUES (?)`;
      connection.query(sql, answer.addDepartment, (err, result) => {
        if (err) throw err;
        console.log('added ' + answer.addDepartment + " to departments!"); 
        addDepartment();
    });
  });
};
   
// function to add roles
addRole = () =>{
  inquirer.prompt([
    {
      type: 'input',
      message: 'What role would you like to add?',
      name: 'role',
      validate: addRole => {
        if (addRole) {
            return true;
        } else {
            console.log('enter a role');
            return false;
        }
      }
    },
    {
      type: 'input',
      message: 'What is the salary?',
      name: 'salary',
      validate: addSalary => {
        if (isNAN(addSalary)) {
            return true;
        } else {
            console.log('enter a salary');
            return false;
        }
      }
    }
  ])
    .then(answer => {
      const params = [answer.role, answer.salary];
     // grab dept from department table
     const roleSql = `SELECT name, id FROM department`; 
     connection.promise().query(roleSql, (err, data) => {
      if (err) throw err; 
  
      const dept = data.map(({ name, id }) => ({ name: name, value: id }));

      inquirer.prompt([
      {
        type: 'list', 
        name: 'dept',
        message: "What department is this role in?",
        choices: dept
      }
      ])
        .then(deptChoice => {
          const dept = deptChoice.dept;
          params.push(dept);

          const sql = `INSERT INTO role (title, salary, department_id)
                      VALUES (?, ?, ?)`;

          connection.query(sql, params, (err, result) => {
            if (err) throw err;
            console.log('Added' + answer.role + " to roles!"); 

            showRoles();
     });
   });
 });
});
};

// function to update employee role 
updateEmployee = () => {
  // get employees from employee table 
  const employeeSql = `SELECT * FROM employee`;

  connection.promise().query(employeeSql, (err, data) => {
    if (err) throw err; 

  const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));

    inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: "Which employee would you like to update?",
        choices: employees
      }
    ])
      .then(empChoice => {
        const employee = empChoice.name;
        const params = []; 
        params.push(employee);

        const roleSql = `SELECT * FROM role`;

        connection.promise().query(roleSql, (err, data) => {
          if (err) throw err; 

          const roles = data.map(({ id, title }) => ({ name: title, value: id }));
          
            inquirer.prompt([
              {
                type: 'list',
                name: 'role',
                message: "What is the employee's new role?",
                choices: roles
              }
            ])
                .then(roleChoice => {
                const role = roleChoice.role;
                params.push(role); 
                
                let employee = params[0]
                params[0] = role
                params[1] = employee 
                

                // console.log(params)

                const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

                connection.query(sql, params, (err, result) => {
                  if (err) throw err;
                console.log("Employee has been updated!");
              
                showEmployees();
          });
        });
      });
    });
  });
};

// function to update an employee 
updateManager = () => {
  // get employees from employee table 
  const employeeSql = `SELECT * FROM employee`;

  connection.promise().query(employeeSql, (err, data) => {
    if (err) throw err; 

  const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));

    inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: "Which employee would you like to update?",
        choices: employees
      }
    ])
      .then(empChoice => {
        const employee = empChoice.name;
        const params = []; 
        params.push(employee);

        const managerSql = `SELECT * FROM employee`;

          connection.promise().query(managerSql, (err, data) => {
            if (err) throw err; 

          const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));
            
              inquirer.prompt([
                {
                  type: 'list',
                  name: 'manager',
                  message: "Who is the employee's manager?",
                  choices: managers
                }
              ])
                  .then(managerChoice => {
                    const manager = managerChoice.manager;
                    params.push(manager); 
                    
                    let employee = params[0]
                    params[0] = manager
                    params[1] = employee 
                    

                    // console.log(params)

                    const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;

                    connection.query(sql, params, (err, result) => {
                      if (err) throw err;
                    console.log("Employee has been updated!");
                  
                    showEmployees();
          });
        });
      });
    });
  });
};

// function to view employee by department
employeeDepartment = () => {
  console.log('employee by departments...\n');
  const sql = `SELECT employee.first_name, employee.last_name, department.name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id`;

  connection.promise().query(sql, (err, rows) => {
    if (err) throw err; 
    console.table(rows); 
    employeeUpdate();
  });          
};

// function to delete department
deleteDepartment = () => {
  const deptSql = `SELECT * FROM department`; 

  connection.promise().query(deptSql, (err, data) => {
    if (err) throw err; 

    const dept = data.map(({ name, id }) => ({ name: name, value: id }));

    inquirer.prompt([
      {
        type: 'list', 
        name: 'dept',
        message: "What department do you want to delete?",
        choices: dept
      }
    ])
      .then(deptChoice => {
        const dept = deptChoice.dept;
        const sql = `DELETE FROM department WHERE id = ?`;

        connection.query(sql, dept, (err, result) => {
          if (err) throw err;
          console.log("successfully deleted!"); 

        showDepartments();
      });
    });
  });
};

// function to delete role
deleteRole = () => {
  const roleSql = `SELECT * FROM role`; 

  connection.promise().query(roleSql, (err, data) => {
    if (err) throw err; 

    const role = data.map(({ title, id }) => ({ name: title, value: id }));

    inquirer.prompt([
      {
        type: 'list', 
        name: 'role',
        message: "What role do you want to delete?",
        choices: role
      }
    ])
      .then(roleChoice => {
        const role = roleChoice.role;
        const sql = `DELETE FROM role WHERE id = ?`;

        connection.query(sql, role, (err, result) => {
          if (err) throw err;
          console.log("successfully deleted!"); 

          allRoles();
      });
    });
  });
};

// function to delete employees
deleteEmployee = () => {
  // get employees from employee table 
  const employeeSql = `SELECT * FROM employee`;

  connection.promise().query(employeeSql, (err, data) => {
    if (err) throw err; 

  const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));

    inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: "Which employee would you like to delete?",
        choices: employees
      }
    ])
      .then(empChoice => {
        const employee = empChoice.name;

        const sql = `DELETE FROM employee WHERE id = ?`;

        connection.query(sql, employee, (err, result) => {
          if (err) throw err;
          console.log("Successfully Deleted!");
        
          allEmployees();
    });
  });
 });
};

// view department budget 
viewBudget = () => {
  console.log('Showing budget by department...\n');

  const sql = `SELECT department_id AS id, 
                      department.name AS department,
                      SUM(salary) AS budget
               FROM  role  
               JOIN department ON role.department_id = department.id GROUP BY  department_id`;
  
  connection.promise().query(sql, (err, rows) => {
    if (err) throw err; 
    console.table(rows);

    employeeUpdate()
  })
}

