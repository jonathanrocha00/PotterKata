"use strict";

var numberOfBooks = [[1, 5],
                     [2, 5],
                     [3, 4],
                     [4, 5],
                     [5, 4]];

// var arrayOfSets = [
//   [1, 2, 3, 4],
//   [1, 2, 3, 4]
// ];

function calculatePrice(arrayOfSets) {

  var total = 0;

  for (var i = 0; i < arrayOfSets.length; i++) {
    if (arrayOfSets[i].length == 0) {
      throw new Error("The input had an empty set.");
    } else if (arrayOfSets[i].length == 1) {
      total += (8 * 1) + 1.00;
    } else if (arrayOfSets[i].length == 2) {
      total += (8 * 2) * 0.95;
    } else if (arrayOfSets[i].length == 3) {
      total += (8 * 3) * 0.90;
    } else if (arrayOfSets[i].length == 4) {
      total += (8 * 4) * 0.80;
    } else if (arrayOfSets[i].length == 5) {
      total += (8 * 5) * 0.75;
    } else {
      throw new Error("The input had a set with more than 5 elements.");
    }
  }

  return total;
}

function createSets(numberOfBooks) {

  numberOfBooks.sort(function(first, second) {
    return second[1] - first[1];
  });

  console.log(numberOfBooks);

  var arrayOfSets = [];

  console.log("Evaluating book " + numberOfBooks[0][0]);
  // Populates the arrayOfSets with as much sets as the number of copies
  // of the book that has more copies.
  for (var i = 0; i < numberOfBooks[0][1]; i++) {
    arrayOfSets.push([numberOfBooks[0][0]]);
  }

  var differenceHappened = false;

  for (var i = 1; i < numberOfBooks.length; i++) {
    console.log("Evaluating book " + numberOfBooks[i][0]);

    if (numberOfBooks[i][1] == numberOfBooks[i - 1][1]) {
      console.log("Book " + numberOfBooks[i][0] + " has the same number " +
      "of copies as book " + numberOfBooks[i - 1][0]);

      if (!differenceHappened){
        for (var j = 0; j < numberOfBooks[i][1]; j++) {
          arrayOfSets[j].push(numberOfBooks[i][0]);
        }

        continue;
      }
    }

      differenceHappened = true;

      for (var j = 0; j < numberOfBooks[i][1]; j++) {

        var smallestPrice = Number.MAX_VALUE;

        var bestPosition = 0;

        for (var k = 0; k < arrayOfSets.length; k++) {

          var tempArrayOfSets = JSON.parse(JSON.stringify(arrayOfSets));

          console.log("Trying to insert copy " + j + " of book " +
          numberOfBooks[i][0] + " inside set " + k + ": " + tempArrayOfSets[k]);

          if(!tempArrayOfSets[k].includes(numberOfBooks[i][0])) {
            tempArrayOfSets[k].push(numberOfBooks[i][0]);

            console.log("Smallest price is " + smallestPrice +
            " and the current is " + calculatePrice(tempArrayOfSets));

            if (calculatePrice(tempArrayOfSets) < smallestPrice) {

              console.log("Current price is smaller");

              bestPosition = k;
              smallestPrice = calculatePrice(tempArrayOfSets);
            } else {

            }

          } else {
            console.log("Set " + k + " already has a copy of book " + numberOfBooks[i][0]);
          }
        }

        console.log("The best position for copy " + j + " of book " +
        numberOfBooks[i][0] + " is in set " + bestPosition);

        arrayOfSets[bestPosition].push(numberOfBooks[i][0]);

        console.log(arrayOfSets);
      }
  }



  return arrayOfSets;
}

console.log(createSets(numberOfBooks));
