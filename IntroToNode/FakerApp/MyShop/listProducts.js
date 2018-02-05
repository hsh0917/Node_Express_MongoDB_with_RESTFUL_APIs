var faker = require("faker")

var product = [];

var price = [];

for (var i=0; i<10; i++){
    product[i] = faker.commerce.productName();
    price[i] = faker.commerce.price();
console.log(product[i] + " - " + price[i]);
}