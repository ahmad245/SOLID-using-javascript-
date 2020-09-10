//Single Responsibilty Principle
// "A class or function should only have one reason to change."



//Bad
class UserSetting {
    constructor(user) {
        this.user = user;
    }
    changeSetting(setting) {
        if (this.verfyCreaditional()) {
            //.....
        }
    }
    verfyCreaditional() {
        //....
    }
}

//Good

class UserAuth {
    constructor(user) {
        this.user = user;
    }
    verfyCreaditional() {
        //...
    }
}

class UserSetting {
    constructor(user) {
        this.user = user;
        this.auth = new UserAuth(user);
    }
    changeSetting(setting) {
        if (this.auth.verfyCreaditional()) {
            //...
        }
    }
}

/////////////////////////////////////////////////////////////
//Bad
class Person {
    constructor(email, password) {
        if (this.validateEmail(emai)) {
            this.email = email;
        }
        this.password = password;
    }
    validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }
    greet() {
        alert("Hi!");
    }
}
//Good
class Person {
    constructor(email, password) {
        let validateEmail = new Email(email);
        if (validateEmail.validateEmail(emial)) {
            this.email = email;
        }
        this.password = password;
    }

    greet() {
        alert("Hi!");
    }
}
class Email {
    constructor(email) {
        this.email = email;
    }
    validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }
}
//////////////////////////////////////////////////////////
//If we had an HR department, an Accounting department and an IT department in an enterprise application that calculates pay, and reports and saves hours,
// we'd better make sure that we've split up (or abstracted) the operations most likely to change for each each department.

//Bad we will use alot of swich case in this implementation ////////////////////////////
class Employee {
    constructor() {}
    calculatePay() {
        // implement algorithm for hr, accounting and it
    }
    reportHours() {
        // implement algorithm for hr, accounting and it
    }

    save() {
        // implement algorithm for hr, accounting and it
    }
}

//Good
class AbstractEmployee {
    calculatePay() {
        // implement algorithm for hr, accounting and it
    }
    reportHours() {
        // implement algorithm for hr, accounting and it
    }

    save() {
        // implement algorithm for hr, accounting and it
    }
}

class HR extends AbstractEmployee {
    constructor() {
        super();
    }
    calculatePay() {
        // implement algorithm for hr, accounting and it
    }
    reportHours() {
        // implement algorithm for hr, accounting and it
    }

    save() {
        // implement algorithm for hr, accounting and it
    }

}
class IT extends AbstractEmployee {
    constructor() {
        super();
    }
    calculatePay() {
        // implement algorithm for hr, accounting and it
    }
    reportHours() {
        // implement algorithm for hr, accounting and it
    }

    save() {
        // implement algorithm for hr, accounting and it
    }

}