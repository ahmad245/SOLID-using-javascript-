//The best explanation for this is if you have a parent class and a child class, then the base class and child class can be used interchangeably without getting incorrect results
//Bad
class Rectangle {
    constructor() {
        this.width = 0;
        this.height = 0
    }

    getWidth() {
        return this.width;
    }
    setWidth(width) {
        this.width = width;
    }
    getHeight() {
        return this.height;
    }
    setHeight(height) {
        this.height = height;
    }

    setColor(color) {
        this.color = color;
    }

    getArea() {
        return this.width * this.height;
    }
    render(area) {
        //...
    }
}

class Square extends Rectangle {
    constructor() {
        super();
    }
    setHeight(height) {
        this.height = height;
        this.width = height;
    }
    setWidth(width) {
        this.width = width;
        this.height = width;
    }

}

function renderLargeRectangles(rectangles) {
    rectangles.forEach(rectangle => {
        rectangle.setHeight(5);
        rectangle.setWidth(4);
        const area = rectangle.getArea();
        rectangle.render();
    });
}
const rectangles = [new Rectangle(), new Rectangle(), new Square()];
renderLargeRectangles(rectangles);


////////////////////////////////////////////////////////////////////////////////////////////////////////////

//GOOD
class Shape {
    constructor() {

    }
    setColor(color) {
        this.color = color;
    }
    render(area) {
        //.....
    }
}
class Rectangle2 extends Shape {
    constructor(width, height) {
        super();
        this.widtth = width,
            this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }


}

class Square2 extends Shape {
    constructor(height) {
        super();
        this.height = height;
    }
    getArea() {
        return 2 * this.height;
    }
}

function renderLargeRectangles2(shapes) {
    shapes.forEach((shape) => {
        const area = shape.getArea();
        shape.render(area);
    })
}

const shapes = [new Rectangle(4, 5), new Rectangle(4, 5), new Square(5)];
renderLargeShapes2(shapes);