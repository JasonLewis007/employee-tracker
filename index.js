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

      function addEmployee() {
        console.log("Add employee\n")
      
        var query =
          `SELECT r.id, r.title, r.salary 
            FROM role r`
      
        connection.query(query, function (err, res) {
          if (err) console.error("addEmployee function error");
      
        //   be careful with backticks, can lead to SQL injection
          const roleChoices = res.map(({ id, title, salary }) => ({
            value: id, title: `${title}`, salary: `${salary}`
          }));
      
          console.table(res);
          console.log("Role to insert");
      
          promptInsert(roleChoices);
        });
    }
    
    // data returned from this function gets passed through addEmployee function
    function promptInsert(roleChoices) {
        inquirer.prompt([
            {
              type: "input",
              name: "first_name",
              message: "What is the employee's first name?"
            },
            {
              type: "input",
              name: "last_name",
              message: "What is the employee's last name?"
            },
            {
              type: "list",
              name: "roleId",
              message: "What is the employee's role?",
              choices: roleChoices
            },
          ])
          .then(function (answer) {
            console.log(answer);
      
            var query = `INSERT INTO employee SET ?`
            // when finished prompting, insert a new item into the db with the new info
            connection.query(query,
              {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.roleId,
                manager_id: answer.managerId,
              },
              function (err, res) {
                if (err) console.error("promptInsert function error");
      
                console.table(res);
                console.log(res.insertedRows + "Inserted successfully\n");
      
                starterPrompt();
              });
          });
    }
    