const functions = require("./functions");

let bookBasket = [[1, 2],
                  [2, 2],
                  [3, 2],
                  [4, 1],
                  [5, 1]];

let arrayOfSets = functions.process(bookBasket);

console.log("\nFinal array of sets:");
console.log(arrayOfSets);

console.log(`\nBasket price: ${functions.calculatePrice(arrayOfSets)}`);
