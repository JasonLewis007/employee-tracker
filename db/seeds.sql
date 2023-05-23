-- SOURCE seeds.sql SECOND AFTER SOURCING schema.sql FIRST

USE employee_DB;

--values to insert into department table
INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");


--values to insert into role table

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 4);

--values to insert into employee table

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sharon", "Peters", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kayla", "Choo", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jon", "Plants", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dab", "Stein", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Wick", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Swartz", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Harry", "Potter", 4, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Tomlin", 2, 1);