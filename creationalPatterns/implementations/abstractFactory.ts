interface Product {
    doSomething(): string;
}

class Boat implements Product {
    name: string

    constructor(n: string) {
        this.name = n;
    }

    doSomething(): string {
        return "I'm a brand new boat and my name is: "+this.name;
    }

}

class Truck implements Product {
    name: string

    constructor(n: string) {
        this.name = n;
    }
    doSomething(): string {
        return "I'm a brand new truck and my name is: "+this.name;
    }

}

interface Factory {
    createBoat(name: string): Boat;
    createTruck(name: string): Truck;
}

export class FurnitureFactory implements Factory {
    createBoat(name: string) {
        return new Boat(name);
    }
    createTruck(name: string) {
        return new Truck(name);
    }
}