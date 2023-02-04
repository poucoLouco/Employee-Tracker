use Employee_tracker;

select * from department;

select * from role;


select * from employee;


select e.first_name,e.last_name,e.role_id,
r.title,r.salary,r.department_id,
d.department_name from employee e
left join role r on e.role_id = r.id
left join department d r.department_id = d.id;
