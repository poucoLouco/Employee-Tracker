use Employee_tracker;


INSERT INTO DEPARTMENT(DEPARTMENT_NAME) VALUES('Sales'),
('Marketing'),('IT');

INSERT INTO ROLE(TITLE,SALARY,DEPARTMENT_ID) VALUES
('Manager Sales',129821,1),
('Manager Marketing',21872,2),
('Manager IT',123947,3),
('SalesLD',29821,1),
('MarketingLD',1872,2),
('ITLD',3947,3);


INSERT INTO EMPLOYEE (FIRST_NAME,LAST_NAME,ROLE_ID,MANAGER_ID) VALUES
('Dorry','Fish',1,null),
('Peppa','Pig',2,null),
('George','Pig',3,null),
('Mummy','Pig',4,1),
('Duddy','Pig',5,2),
('Nemo','Fish',6,3);
