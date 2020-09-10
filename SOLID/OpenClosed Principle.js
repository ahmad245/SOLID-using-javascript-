//This means that we should design a class that is closed to modifications, meaning that it will not be changed, but also open, since new functionality can be added by extending this class.
class DecimalToBinary {
    constructor() {}
    d2b(number) {
        return parseInt(number, 10).toString(2);
    }
}

const decimal2Binary = new DecimalToBinary();
console.log(decimal2Binary.d2b("20"));

//if we suddenly need to also convert binary numbers to decimal numbers, or decimal to hexadecimal and so on?
//To do so, we would most likely modify the DecimalToBinary class. This would violate the Open-Closed Principle.

//A better way would be to anticipate this change when designing the class in the first place:

class NumberConverter {
    constructor() {}
    isNumber(number) {
        return !isNaN(number);
    }

    converBase(number, fromBase, toBase) {
        return parseInt(number, fromBase).toString(toBase);
    }
}

class DecimalToBinary2 extends NumberConverter {
    constructor() {}
    d2b(number) {
        return this.converBase(number, 10, 2);
    }
}

class BinaryToDecimal extends NumberConverter {
    constructor() {}
    d2b(number) {
        return this.converBase(number, 2, 10);
    }
}


/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
// Bad : problem : But what if we decide that we don’t want the favoriteCities object to store its items in an array and decide it’s better to store them in an object?
const favoriteCities = {
    items: ['homs', 'halab', 'idleb'],
    description: 'this is description'
}

const announce = (collection) => {
    console.log(collection.description);

    collection.items.forEach((el) => console.log(el))
}
announce(favoriteCities);

// Good A better solution is to use polymorphism and to let each collection object decide for itself how its items should be iterated over and logged
const favoriteCities2 = {
    items: {
        city1: 'homs',
        city2: 'halab',
        city3: 'idleb',

    },
    description: 'this is description',
    logItems: function() {
        for (const [key, value] of Object.entries(this.items)) {
            console.log(key, value);
        }
    }
}
const announce2 = (collection) => {
    console.log(collection.description);

    collection.logItems();
}
announce2(favoriteCities2);