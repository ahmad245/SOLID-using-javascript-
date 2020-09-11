//The composition is the strong type of association. An association is said to composition if an Object owns another object and another object cannot exist without the owner object. Consider the case of Human having a heart. 
//Here Human object contains the heart and heart cannot exist without Human

//In Composition, parent owns child entity so child entity can’t exist without parent entity. We can’t directly or independently access child entity

//1-Composition(mixture) is a way to wrap simple objects or data types into a single unit
//2-In composition , parent entity owns child entity.
//3-Child doesn’t have their own life time 
//4-It is a strong association 

class User {
    constructor(id, name, address) {
        this.id = id;
        this.name = name;
        this.address = address;
    }

}

class Address {
    constructor(id, location) {
        this.id = id;
        this.location = location;
    }
}

const main = () => {
    const user = new User(i, 'ahmad', new Address(1, 'homs'));
    console.log(user);
}


////////////////////////////////
class Car {
    constructor() {
        this.engine = new Engine();
    }

}

class Engine {

}