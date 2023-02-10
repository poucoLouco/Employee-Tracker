USE employee_tracker;

INSERT INTO department (name)
VALUES('Sales'),('Marketing'),('IT');

INSERT INTO role(title,salary,department_id) 
VALUES
('Manager Sales',150000,1),
('Manager Marketing',200000,2),
('Manager IT',12000,3),
('SalesLD',180000,1),
('MarketingLD',200000,2),
('ITLD',150000,3);


INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES
('Dory','Fish',1,null),
('Peppa','Pig',2,null),
('George','Pig',3,null),
('Mummy','Pig',4,1),
('Duddy','Pig',5,2),
('Nemo','Fish',6,3);

-- INSERT INTO name
-- VALUES('Sales'),('Marketing'),('IT');
--  SELECT * 
--  FROM employee;