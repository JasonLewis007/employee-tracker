-- SOURCE SCHEMA.SQL FIRST - BEFORE SEEDS.SQL

DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;
USE employees_DB;

--Create table department for seeds to populate employee DB
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

-- Create tabel role for seeds to populate employee DB
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10.3) NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
);
-- Create tabel role for employee to populate employee DB
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);