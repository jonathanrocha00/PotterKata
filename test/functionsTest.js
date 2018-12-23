

const assert = require("chai").assert;
const expect = require("chai").expect;
const functions = require("../functions");

describe("Testing functions...", function(){
  describe("calculatePrice()", function(){
    it("1 sets of 0 books should throw Error", function(){
      let arrayOfSets = [
        []];

      expect(function(){
        functions.calculatePrice(arrayOfSets);
      }).to.throw(Error);
    });

    it("1 sets of 6 books should throw Error", function(){
      let arrayOfSets = [
        [1, 2, 3, 4, 5, 6]];

      expect(function(){
        functions.calculatePrice(arrayOfSets);
      }).to.throw(Error);
    });

    it("1 set of 1 book", function(){
      let arrayOfSets = [
        [1]];

      assert.equal(8.0, functions.calculatePrice(arrayOfSets));
    });

    it("2 sets of 1 books", function(){
      let arrayOfSets = [
        [2],
        [3]];

      assert.equal(16.0, functions.calculatePrice(arrayOfSets));
    });

    it("1 set of 2 books", function(){
      let arrayOfSets = [
        [1, 2]];

      assert.equal(15.2, functions.calculatePrice(arrayOfSets));
    });

    it("1 set of 3 books", function(){
      let arrayOfSets = [
        [1, 2, 3]];

      assert.equal(21.6, functions.calculatePrice(arrayOfSets));
    });

    it("1 set of 4 books", function(){
      let arrayOfSets = [
        [1, 2, 3, 4]];

      assert.equal(25.6, functions.calculatePrice(arrayOfSets));
    });

    it("1 set of 5 books", function(){
      let arrayOfSets = [
        [1, 2, 3, 4, 5]];

      assert.equal(30.0, functions.calculatePrice(arrayOfSets));
    });

    it("1 set with 5 random numbers", function(){
      let arrayOfSets = [
        [88, 7, 24, 42, 100]];

      assert.equal(30, functions.calculatePrice(arrayOfSets));
    });

    it("1 set of 1 book & 1 set of 2 books", function(){
      let arrayOfSets = [
        [1],
        [1, 2]
      ];

      assert.equal(23.2, functions.calculatePrice(arrayOfSets));
    });

    it("1 set of 3 book & 1 set of 4 books", function(){
      let arrayOfSets = [
        [1, 2, 3],
        [1, 2, 3, 4]
      ];

      assert.equal(47.2, functions.calculatePrice(arrayOfSets));
    });

    it("1 set of 2 book & 1 set of 5 books", function(){
      let arrayOfSets = [
        [1, 2],
        [1, 2, 3, 4, 5]
      ];

      assert.equal(45.2, functions.calculatePrice(arrayOfSets));
    });

    it("5 sets, with all possible number of books", function(){
      let arrayOfSets = [
        [1],
        [1, 2],
        [1, 2, 3],
        [1, 2, 3, 4],
        [1, 2, 3, 4, 5]
      ];

      assert.equal(100.4, functions.calculatePrice(arrayOfSets));
    });

    it("2 sets with 4 books each", function(){
      let arrayOfSets = [
        [1, 2, 3, 4],
        [1, 2, 3, 4]
      ];

      assert.equal(51.2, functions.calculatePrice(arrayOfSets));
    });

  });

  describe("sortBucket()", function(){

    it("1 item", function(){
      let basket = [[1, 1]];
      let orderedBasket = functions.sortBucket(basket)
      assert.equal(1, orderedBasket[0][0]);
    });

    it("5 items", function(){
      let basket = [[1, 1],
                    [2, 2],
                    [3, 3],
                    [4, 4],
                    [5, 5]];
      let orderedBasket = functions.sortBucket(basket)
      assert.equal(5, orderedBasket[0][0]);
      assert.equal(4, orderedBasket[1][0]);
      assert.equal(3, orderedBasket[2][0]);
      assert.equal(2, orderedBasket[3][0]);
      assert.equal(1, orderedBasket[4][0]);
    });

    it("random items", function(){
      let basket = [[7, 7],
                    [42, 42],
                    [24, 24]];
      let orderedBasket = functions.sortBucket(basket)
      assert.equal(42, orderedBasket[0][0]);
      assert.equal(24, orderedBasket[1][0]);
      assert.equal(7, orderedBasket[2][0]);
    });
  });

  describe("processBookWithMostCopies()", function(){

    it("1 book with 5 copies", function(){
      let basket = [[1, 5]];
      let orderedBasket = functions.sortBucket(basket);
      assert.equal(5, functions.processBookWithMostCopies(orderedBasket).length);
    });

    it("5 books with many copies", function(){
      let basket = [[1, 3],
                    [2, 8],
                    [3, 4],
                    [4, 7],
                    [5, 10]];
      let orderedBasket = functions.sortBucket(basket);
      assert.equal(10, functions.processBookWithMostCopies(orderedBasket).length);
    });

    it("7 books with many copies", function(){
      let basket = [[1, 3],
                    [2, 8],
                    [3, 4],
                    [4, 7],
                    [5, 24],
                    [6, 42],
                    [7, 2]];
      let orderedBasket = functions.sortBucket(basket);
      assert.equal(42, functions.processBookWithMostCopies(orderedBasket).length);
    });

  });

  describe("findBestPositionForBook()", function(){

    it("1 set", function(){
      let arrayOfSets = [[1]];
      let bestPosition = functions.findBestPositionForBook(2, 0, arrayOfSets);

      assert.equal(0, bestPosition);
    });

    it("2 sets of 1 and 2 copies", function(){
      let arrayOfSets = [[1],
                         [1, 2]];
      let bestPosition = functions.findBestPositionForBook(5, 0, arrayOfSets);

      assert.equal(1, bestPosition);
    });

    it("2 sets of 3 and 4 copies", function(){
      let arrayOfSets = [[1, 2, 3],
                         [1, 2, 3, 4]];
      let bestPosition = functions.findBestPositionForBook(5, 0, arrayOfSets);

      assert.equal(0, bestPosition);
    });

    it("5 sets", function(){
      let arrayOfSets = [[1, 2, 3],
                         [1, 2, 3, 4],
                         [1, 2, 3, 4],
                         [1, 2, 3, 4],
                         [1, 2, 3, 4]];
      let bestPosition = functions.findBestPositionForBook(5, 0, arrayOfSets);

      assert.equal(0, bestPosition);
    });
  });

  describe("process()", function(){

    it("1 book with 1 copy", function(){
      let basket = [[1, 1]];

      assert.equal(8, functions.calculatePrice(functions.process(basket)));
    });

    it("1 book with 5 copies", function(){
      let basket = [[1, 5]];

      assert.equal(8 * 5, functions.calculatePrice(functions.process(basket)));
    });

    it("2 books with 3 and 4 copies", function(){
      let basket = [[1, 3],
                    [2, 4]];

      assert.equal(8 + 3 * 15.2, functions.calculatePrice(functions.process(basket)));
    });

    it("5 books with many copies", function(){
      let basket = [[1, 2],
                    [2, 2],
                    [3, 2],
                    [4, 1],
                    [5, 1]];

      assert.equal(51.20, functions.calculatePrice(functions.process(basket)));
    });


  });










});
