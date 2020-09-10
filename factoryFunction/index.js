//class
class ClassCar {

    drive() {
        console.log('drive');
    }
}

const car1 = new ClassCar();
car1.drive();


//constructor function
function ConstructorCar() {}

ConstructorCar.prototype.drive = function() {
    console.log('drive');
}

const car2 = new ConstructorCar();
car2.drive();


//factory
const proto = {
    drive: function() {
        console.log('dirve');
    }
}

//const FactoryCar = () => proto;
const FactoryCar = () => Object.create(proto);
const car3 = FactoryCar();
car3.drive();