var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "hello",
  database: "bamazon"
});

var sqlCommand = 'SELECT * FROM PRODUCTS';

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);

  connection.query(sqlCommand, function(err, response) {
    if (err) { console.error('bamazonCustomer.js:', err); }
    console.log('\nresponse: ', response)   
  })

  console.log("----------------------------------------------");

  customerPrompt();

});

function customerPrompt() {
    connection.query("SELECT item_id, product_name, price FROM products WHERE stock_quantity > 0", function (err, res) {
        if (err) throw err;

        console.log("Welcome to Bamazon! It's time to shop! Select the item you would like to buy");
        console.table(res);

        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "What is the id of the product you would like to purchase?",

                validate: function (value) {
                    if (isNaN(value) || parseInt(value) > res.length || parseInt(value) < 0) {
                        return "Please provide a valid id";
                    } else {
                        return true;
                    }
                }
            },
            {
                type: "input",
                name: "qty",
                message: "How much would you like to purchase?",
                validate: function (value) {
                    if (isNaN(value)) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        ]).then(function (answer) {
            checkAmounts(answer);
        });
    });
};

function checkAmounts(value) {
    connection.query(`select product_name, stock_quantity, price from products WHERE item_id = ${value.id}`, function (err, res) {
        if (err) throw err;

        var sqlProductName = res[0].product_name;
        var sqlProductQuantity = res[0].stock_quantity;
        var sqlProductPrice = res[0].price;

        if (value.qty <= res[0].stock_quantity) {

            var sqlUpdatedQuantity = parseInt(sqlProductQuantity) - parseInt(value.qty);

            console.log(`YAY! It was a successful purchase!
            \nWould you like anything else today?`);

            updateSQL(value.id, sqlUpdatedQuantity);

            promptAgain();

        } else {
            console.log(`"Insufficient quantity!- Current Inventory of : ${res[0].stock_quantity}`);
            customerPrompt();
        }
    });
}

function promptAgain() {

    var question =
        [
            {
                type: "list",
                name: "again",
                message: "Would you like anything else today?",
                choices: ['Yes', 'No']
            }
        ];

    inquirer.prompt(question).then(answers => {
        if (answers.again == 'Yes') {
            console.log("What would you like additionally?");
            customerPrompt();
        } else {
            console.log(`
            \nThank you for shopping today!  
            \nBYEEEEEEEE!`);
            connection.end();
        }
    });
}

function updateSQL(id, quantity) {

    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: quantity
            },
            {
                item_id: id
            }
        ],
        function (err, res) {
            if (err) throw err;
        });
}