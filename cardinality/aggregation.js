//Aggregation is a weak association. An association is said to be aggregation if both Objects can exist independently. For example, a Team object and a Player object.
// The team contains multiple players but a player can exist without a team.

//In Aggregation , parent and child entity maintain Has-A relationship but both can also exist independently. 
//We can use parent and child entity independently. Any modification in the parent entity will not impact the child entity or vice versa.

//1-Aggregation(collection) differs from ordinary composition in that it does not imply ownership
//2-In Aggregation , parent Has-A relationship with child entity
//3-Child can have their own life time 
//4-It is a weak association 

class Shop {
    constructor(id, name) {
        this._id = id;
        this._name = name;
    }

    set seller(value) {
        this._seller = value;
    }

    get seller() {
        return this._seller;
    }
}

class Seller {
    constructor(id, name) {
        this._id = id;
        this._name = name;
    }
}


const shop1 = new Shop(1, 'Robocop shop');
shop1._seller = new Seller(1, 'seller Bukalapak');

const shop2 = new Shop(1, 'Noice shop');
shop2._seller = new Seller(2, 'seller Tokopedia');

console.log(shop1);
console.log(shop2);

///////////////////////////////////////////////////////////////
class Team {
    constructor() {
        this.list = [];

    }

    getPlayer() {
        return this.players;
    }
    setPlayer(player) {
        this.list.push(new Player);
    }
}

class Player {

}