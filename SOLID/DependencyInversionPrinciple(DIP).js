//This principle states two essential things:

//1-High-level modules should not depend on low-level modules. Both should depend on abstractions.
//2-Abstractions should not depend upon details. Details should depend on abstractions.

//This can be hard to understand at first, but if you've worked with AngularJS, you've seen an implementation of this principle in the form of Dependency Injection (DI).
// While they are not identical concepts, DIP keeps high-level modules from knowing the details of its low-level modules and setting them up.
// It can accomplish this through DI. 
//A huge benefit of this is that it reduces the coupling between modules.
// Coupling is a very bad development pattern because it makes your code hard to refactor.

//As stated previously, JavaScript doesn't have interfaces so the abstractions that are depended upon are implicit contracts. 
//That is to say, the methods and properties that an object/class exposes to another object/class. In the example below, 
//the implicit contract is that any Request module for an InventoryTracker will have a requestItems method.


class ClassA {}
class ClassB {}
class ClassC {}
class Facade {
    constructor() {
        this.a = new ClassA();
        this.b = new ClassB();
        this.c = new ClassC();
    }
}
class Foo {
    constructor() {
        this.facade = new Facade();

    }
}


///////////////////////////////////////////////////////////////////////////////////////////////
class Database {
    constructor() {
        throw new Error(`Abstract class "${this.constructor.name}" cannot be instantiated directly.`);
    }
    insert() {
        throw new Error('You have to implement the method insert!');
    }
    update() {
        throw new Error('You have to implement the method update!');
    }
    delete() {
        throw new Error('You have to implement the method delete!');
    }
}

class MySQLDatabase extends Database {
    insert() {
        // Implementation code
    }

    update() {
        // Implementation code
    }

    delete() {
        // Implementation code
    }
}

class MongoDatabase extends Database {
    insert() {
        // Implementation code
    }
    update() {
        // Implementation code
    }
    delete() {
        // Implementation code
    }
}

class PaymentService {
    constructor(database) {
        this.database = database;
    }

    paymentIsValid() {
        // Implementation code
    }

    openDatabase() {
        // Implementation code
    }

    addNewPayment() {
        // Implementation code
    }

    removePaymentByID() {
        // Implementation code
    }

    updatePaymentByID() {
        // Implementation code
    }
}

const mysal = new MySQLDatabase();
const paymentService = new PaymentService(mysal);
paymentService.openDatabase();