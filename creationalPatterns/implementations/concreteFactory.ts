interface Trasportation {
    tag: string;
    planDelivery()
}

abstract class Transport implements Trasportation {
    tag: string;

    planDelivery() {
        
    }
}



class Truck extends Transport {
    tag: string;

    constructor(myTag: string) {
        super();
        if(myTag) this.tag='t'+myTag;
    }

    planDelivery() {
        
    }

    printTag() {
        console.log(this.tag)
    }
}

class Boat extends Transport {
    tag: string;
    
    constructor(myTag: string) {
        super();
        if(myTag) this.tag='b'+myTag;
    }

    planDelivery() {
        
    }

    printTag() {
        console.log(this.tag)
    }
}

abstract class Creator {

    public abstract factoryMethod(tag: string): Transport;

}

export class concreteTruckCreator extends Creator {

    public factoryMethod(tag: string): Truck {
        return new Truck(tag);
    }

}

export class concreteBoatCreator extends Creator {

    public factoryMethod(tag: string): Boat {
        return new Boat(tag);
    }

}