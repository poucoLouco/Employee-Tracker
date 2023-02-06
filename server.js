const mysql = require('mysql2');
const inquirer = require('inquirer')
const connection = require("./db/connection")
const db = mysql.createConnection({
    host: 'localhost',
    database: 'Employee_tracker',
    user: 'root',
    password: '123741q'
})
db.connect(function (err) {
    if (err) {
        console.log(err)
        throw err;
    }
    console.log('DB connect')
    start()
})
function start() {
    inquirer.prompt([
        {
            type: "list",
            message: "welcome to team",
            name: "menu",
            choices: ["display all employees", "display all departments", "display all roles", "add employee", "add roles", "add department", "exit application"]

        }
    ]).then(response => {
        switch (response.menu) {
            case "display all employees":
                displayEmployees()
                break;
            case "display all departments":
                displayDepartments()
                break;
            case "display all roles":
                displayRoles()
                break;
            case "add employee":
                addEmployee()
                break;
            case "add roles":
                addRoles()
                break;
            case "add department":
                addDepartment()
                break;
            case "update an employee role":
                updateEmployeeRole()
                break;
            case "exit application":
                exitApplication()
                break;
        }
    })
}
function addEmployee(){
    connection.query("select * from department(name)", function (err, results) {
            if (err) throw err;
            console.table(results);
 function displayEmployees() {

}
function displayDepartments() {
    // console.log(connection.promise().query("select * from department"))
    // connection.query("select * from department(name)", function (err, results) {
    //     if (err) throw err;
    //     console.table(results);

//     })
}
function displayRoles() {

}
// function addEmployee() {
//     const addEmployee = () => {
//         inquirer.prompt([
//           {
//             type: "input",
//             name: "first_name",
//             message: "What is your first name?",
//             validate: (frtNameInput) => {
//               if (frtNameInput) {
//                 return true;
//               } else {
//                 console.log("maybe some first name should by here");
//                 return false;
//               }
//             },
//           },
      
//           {
//             type: "input",
//             name: "last_name",
//             message: "What is your last name?",
//             validate: (lstNameInput) => {
//               if (lstNameInput) {
//                 return true;
//               } else {
//                 console.log("something like a last name");
//                 return false;
//               }
//             },
//           },
//           {
//             type: "input",
//             name: "role_id",
//             message: "What is a role of employee?",
//             validate: (employeeRole) => {
//               if (employeeRole) {
//                 return true;
//               } else {
//                 console.log("and role is..");
//                 return false;
//               }
//             },
//           },
//           {
//               type: "input",
//               name: "manager_id",
//               message: "what manager ID is ?",
//               validate: (managerId) => {
//                 if (managerId) {
//                   return true;
//                 } else {
//                   console.log("manager ID is?");
//                   return false;
//                 }
                
//               },
//             },
    
//         ]).then(({ first_name, last_name, role_id, manager_id }) => {
//     const newEmployee = new Employee(first_name, last_name, role_id, manager_id)
//     teamMember.push(newEmployee)
//     addEmployee()
// })
//     }

function addRoles() {

}

function addDepartment() {

}
function updateEmployeeRole() {

}
function exitApplication() {

}