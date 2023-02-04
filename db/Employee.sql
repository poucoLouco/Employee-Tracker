drop database if exists Employee_tracker;
create database Employee_tracker;
use Employee_tracker;


CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   title varchar(100) ,
   salary decimal not null,
   department_id  Int NOT NULL
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   first_name varchar(30) ,
   last_name varchar(30),
   role_id  Int NOT NULL references role(id),
   manager_id Int  NULL
    REFERENCES employee(id)
    ON DELETE SET NULL
);