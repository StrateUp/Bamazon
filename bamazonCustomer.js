// Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
// The app should then prompt users with two messages.
// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
// However, if your store does have enough of the product, you should fulfill the customer's order.
// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.

var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "beastie1258",
  database: "Bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  	console.log("Welcome to Bamazon: Begin shopping below")
  	runSearch();
  	
});
//make the constructor fcn for the item info or dont and just return everything


function runSearch(){

	var query = "SELECT * FROM products";
	connection.query(query, function(err, res){
		if (! err && res != null) {

			for (var i = 0; i < res.length; i++) {
				var item = res[i];
				console.log("Product ID: " + item.item_id + " NAME: " + item.product_name + " Price: " + item.price);
			}

			// TODO don't forget to remove this
			//connection.end();
		} else {
			console.log(err);
		}

	});
}
// item_id Int(11) auto_increment not null,
// product_name varchar(255) not null,
// department_name varchar(255) not null,
// price decimal(3,2) not null, 
// stock_quantity Int(11) not null,
// primary key (item_id)
// );

 var Item = function(){
 	this.item_id = item_id,
 	this.product_name = product_name,
	this.department_name = department_name,
	this.price = price, 
	this.stock_quantity = stock_quantity
}	

var count = 0;
var askQuestion = function() {
    //for (count < 5) {

    inquirer.prompt([{
            type: "input",
            name: "idRequest",
            message: "Type the 'Product ID' of the item you'd like to purchase"
        },
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to buy?"
        },
    ]).then(function(result) {
     	console.log(result);
        var addInventory = new Item(
            result.idRequest,
            result.product_name,
            result.department_name,
            result.price,
            result.quantity);

        count++;
        console.log("you have purchased: " + result.quantity + " " + result.product_name);
        askQuestion();
    });
}
askQuestion();

// }
