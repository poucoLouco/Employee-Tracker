USE employee_tracker;

DROP TABLE IF EXISTS department;

DROP TABLE IF EXISTS role;

DROP TABLE IF EXISTS employee;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title varchar(30),
  salary decimal not null,
  department_id Int NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name varchar(30),
  last_name varchar(30),
  role_id Int NOT NULL,
  FOREIGN KEY (role_id) REFERENCES role(id),
  manager_id Int NULL,
  FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE
  SET
    NULL
);