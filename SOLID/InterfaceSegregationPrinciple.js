//ISP ISP states that "Clients should not be forced to depend upon interfaces that they do not use

//Bad
class DOMTraverser {
    constructor(settings) {
        this.settings = settings;
        this.setup();
    }
    setup() {
        this.rootNode = this.settings.rootNode;
        this.settings.animationModule();
    }
    travers() {
        //...
    }
}

const $ = new DOMTraverser({
    rootNode: document.querySelector("body"),
    animationModule() {
        return { setup: () => {} }
        // Most of the time, we won't need to animate when traversing
        //...
    },
});

//Good
class DOMTraverser2 {
    constructor(settings) {
        this.settings = settings;
        this.options = this.settings.options;
        this.setup()
    }
    setup() {
        this.rootNode = this.settings.rootNode;
        this.setupOption();
    }
    setupOption() {
        if (this.options.animationModule) {
            //...
        }
    }

}
const $2 = new DOMTraverser2({
    rootNode: document.querySelector("body"),
    options: {
        animationModule() {
            return { setup: () => {} }
        }
    },
});



///////////////////////////////////////////////////////////////////////////////////////
//Let’s say some settings we have to do in the constructor. The settings we do should be segregated from the other unwanted settings in the constructor
//Bad in this user the  getMenu function will get invoked in initiateUser()constructor call even though it’s not needed all the time
class User {
    constructor(user) {
        this.user = user;
        this.init();
    }
    init() {
        this.name = this.user.name;
        this.user.getMenu()
    }
}

const user = new User({ name: 'ahmad', getMenu() { console.log('hi') } });

class User2 {
    constructor(user) {
        this.user = user;
        this.options = this.user.options;

        this.init()
    }

    init() {
        this.name = this.user.name;
        this.setupOption()
    }
    setupOption() {
        if (this.options.getMenu) {
            this.options.getMenu()
        }
    }

}
const user2 = new User2({ name: 'ahmad', options: {} });
const user22 = new User2({ name: 'ahmad', options: { getMenu: () => { console.log('hi') } } });