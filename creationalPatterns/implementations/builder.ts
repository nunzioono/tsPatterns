interface Product {}

interface Builder {
    result: Product;
    reset();
    buildStepA();
    buildStepB();
    buildStepC();
    getResult();
}

class House implements Product {
    roof: boolean;
    garage: boolean;
    swimmingPool: boolean;

    constructor() {
        this.roof = false;
        this.garage = false;
        this.swimmingPool = false;
    }
}

class Car implements Product {
    wheels: boolean;
    seats: boolean;

    constructor() {
        this.wheels = false;
        this.seats = false;
    }
}

export class HouseBuilder implements Builder {
    result: House;

    constructor() {
        this.result = new House();
    }

    reset() {
        this.result = new House();
    }
    buildStepA() {
        this.result.garage = true;
    }
    buildStepB() {
        this.result.roof = true;
    }
    buildStepC() {
        this.result.swimmingPool = true;
    }
    getResult() {
        return this.result;
    }
}

export class CarBuilder implements Builder {
    result: Car;

    constructor() {
        this.result = new Car();
    }

    reset() {
        this.result = new Car();
    }

    buildStepA() {
        this.result.seats = true;
    }
    buildStepB() {
        this.result.wheels = true;
    }
    buildStepC() {
        throw new Error("Method not implemented.");
    }
    getResult() {
        return this.result;
    }
}

export class Director {

    builder: Builder;

    constructor(builder: Builder) {
        this.builder= builder;
    }

    changeBuilder(builder: Builder) {
        this.builder = builder;
    }

    make(type: number) {
   
        if(!this.builder) throw new Error("Builder not assigned yet!");

        if(type == 0 && this.builder.constructor.name == "HouseBuilder") {
            this.builder.buildStepA();
            this.builder.buildStepB();
            this.builder.buildStepC();
            return this.builder.getResult();
        } 
        else if (type == 1 && this.builder.constructor.name == "CarBuilder") {
            this.builder.buildStepA();
            this.builder.buildStepB();
            return this.builder.getResult();
        }


    }
}