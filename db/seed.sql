USE employee_tracker;

INSERT INTO departments (name)
VALUES('Sales'),('Marketing'),('IT');

INSERT INTO roles(title,salary,department_id) 
VALUES
('Manager Sales',150000,1),
('Manager Marketing',200000,2),
('Manager IT',12000,3),
('SalesLD',180000,1),
('MarketingLD',200000,2),
('ITLD',150000,3);


INSERT INTO employees (first_name,last_name,role_id) VALUES
('Dory','Fish',1),
('Peppa','Pig',2),
('George','Pig',3),
('Mummy','Pig',4),
('Duddy','Pig',5),
('Nemo','Fish',6);

-- INSERT INTO name
-- VALUES('Sales'),('Marketing'),('IT');
--  SELECT * 
--  FROM employee;