"use strict";

let bookBasket = [[1, 2],
                  [2, 2],
                  [3, 2],
                  [4, 1],
                  [5, 1]];

// var arrayOfSets = [
//   [1, 2, 3, 4],
//   [1, 2, 3, 4]
// ];

function calculatePrice(arrayOfSets) {

  let total = 0;

  for (var i = 0; i < arrayOfSets.length; i++) {
    if (arrayOfSets[i].length == 0) {
      throw new Error("The input had an empty set.");
    } else if (arrayOfSets[i].length == 1) {
      total += (8 * 1) * 1.00;
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

function sortBucket(bucket) {
  return bucket.sort(function(first, second) {
    return second[1] - first[1];
  });
}

function logProcessing(book) {
  console.log(`%cProcessing book ${book}...`, "color: blue; font-weight: bold");
}

function processBooksWithMostCopies(bookBasket, arrayOfSets) {

  logProcessing(bookBasket[0][0]);

  for (var i = 0; i < bookBasket[0][1]; i++) {
    arrayOfSets.push([bookBasket[0][0]]);
  }

  return arrayOfSets;
}

function processBooksWithSameNumberOfCopies(currentBook, previousBook, differentCopyNumberFlag, arrayOfSets) {

  let book = 0, numberOfCopies = 1;

  if (currentBook[numberOfCopies] == previousBook[numberOfCopies] && !differentCopyNumberFlag) {

    console.log(`Book ${currentBook[book]} has the same number of copies as book ${previousBook[book]}`);

    for (var j = 0; j < currentBook[numberOfCopies]; j++) {
      arrayOfSets[j].push(currentBook[book]);
    }

    return arrayOfSets;
  } else {
    return false;
  }

}

function findBestPositionForBook(currentBook, currentCopy, arrayOfSets) {

  let book = 0, numberOfCopies = 1;

  let bestPosition = 0;
  let smallestPrice = Number.MAX_VALUE;

  for (var k = 0; k < arrayOfSets.length; k++) {

    var tempArrayOfSets = JSON.parse(JSON.stringify(arrayOfSets));

    console.log(`%cTesting copy ${currentCopy} of book ${currentBook[book]} inside set ${k}: ${tempArrayOfSets[k]}`, "color: #1ABC9C");

    if(!tempArrayOfSets[k].includes(currentBook[book])) {
      tempArrayOfSets[k].push(currentBook[book]);

      if (calculatePrice(tempArrayOfSets) < smallestPrice) {

        console.log("Total price went down =D");

        bestPosition = k;
        smallestPrice = calculatePrice(tempArrayOfSets);
      } else {
        console.log("Total price went up :/");
      }
    } else {
      console.log(`Set ${k} already has a copy of book ${currentBook[book]}`);
    }
  }

  return bestPosition;
}

function processOtherBooks(bookBasket, arrayOfSets) {

  let differentCopyNumberFlag = false;
  let book = 0, numberOfCopies = 1;

  for (var current = 1; current < bookBasket.length; current++) {

    let predecessor = current - 1;

    logProcessing(bookBasket[current][book]);

    // To optimize the algorithm we can process books which have
    // the same number of copies as its predecessor separately
    if (processBooksWithSameNumberOfCopies(bookBasket[current], bookBasket[predecessor], differentCopyNumberFlag, arrayOfSets)) {
      continue;
    }

    // After the first with a different number of copies,
    // there is no optimization in this matter.
    differentCopyNumberFlag = true;


    for (var currentCopy = 0; currentCopy < bookBasket[current][numberOfCopies]; currentCopy++) {

      let bestPosition = findBestPositionForBook(bookBasket[current], currentCopy, arrayOfSets);


      console.log("The best position for copy " + currentCopy + " of book " +
      bookBasket[current][0] + " is in set " + bestPosition);

      arrayOfSets[bestPosition].push(bookBasket[current][0]);

      console.log(arrayOfSets);
    }
  }
}

function process(bookBasket) {

  let arrayOfSets = [];

  let sortedBookBasket = sortBucket(bookBasket);

  // The book with most copies defines how many sets there will be,
  // so we need to process it individually.
  processBooksWithMostCopies(sortedBookBasket, arrayOfSets);

  processOtherBooks(sortedBookBasket, arrayOfSets);

  return arrayOfSets;
}

console.log(calculatePrice(process(bookBasket)));
