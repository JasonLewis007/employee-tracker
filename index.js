const inquirer = require("inquirer");
const mysql = require("mysql");
require("console.table");

//connect to the database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employee_DB"
  });

  connection.connect(function (err) {
    if (err) console.error("Could not connect to Database");
    starterPrompt();
  });

  //start prompts
  function starterPrompt() {
    inquirer.prompt({
        type: "list",
        name: "task",
        message: "What would you like to do?",
        choices: [
          "View Employees",
          "View Employees by Department",
          "Add Employee",
          "Remove Employees",
          "Update Employee Role",
          "Add Role",
          "End"]
      })

      .then(function ({ task }) {
        switch (task) {
          case "View Employees":
            viewEmployee();
            break;

            case "Add Employee":
                addEmployee();
                break;

            case "Remove Employees":
            removeEmployees();
            break;

            case "Update Employee Role":
            updateEmployeeRole();
            break;

            case "Add Role":
            addRole();
            break;

            case "End":
                connection.end();
                break;
            }
          });
    }

    function viewEmployee() {

        console.log("List of Employees\n");
      
        var query =
          `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        LEFT JOIN role r
          ON e.role_id = r.id
        LEFT JOIN department d
        ON d.id = r.department_id
        LEFT JOIN employee m
          ON m.id = e.manager_id`

          connection.query(query, function (err, res) {
            if (err) console.error("viewEmployee function error");
      
  
            console.table(res);
      
            console.log("Employees viewed\n");
            starterPrompt();
          });
      }