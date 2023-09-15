import { Trasportation } from "./implementations/factory";
import { Transport } from "./implementations/concreteFactory";
import { FurnitureFactory } from "./implementations/abstractFactory";
import { HouseBuilder, CarBuilder, Director } from "./implementations/builder";
import { Product } from "./implementations/prototype";
import { Singleton } from "./implementations/singleton";


/*
    FACTORY PATTERN
*/
export function factory() {
    class Truck implements Trasportation {
        tag: string;
    
        constructor(myTag: string) {
            if(myTag) this.tag='t'+myTag;
        }
    
        planDelivery() {
            
        }
    
        printTag() {
            console.log(this.tag)
        }
    }
    
    class Boat implements Trasportation {
        tag: string;
        
        constructor(myTag: string) {
            if(myTag) this.tag='b'+myTag;
        }
    
        planDelivery() {
            
        }
    
        printTag() {
            console.log(this.tag)
        }
    }

    const myTruck = new Truck('280181');
    myTruck.printTag();
    const myBoat = new Boat('280181');
    myBoat.printTag();    
}

/*
    CONCRETE FACTORY
*/
export function concreteFactory() {
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

    class concreteTruckCreator extends Creator {

        public factoryMethod(tag: string): Truck {
            return new Truck(tag);
        }
    
    }
    
    class concreteBoatCreator extends Creator {
    
        public factoryMethod(tag: string): Boat {
            return new Boat(tag);
        }
    
    }

    const truckCreator = new concreteTruckCreator();
    const boatCreator = new concreteBoatCreator();
    const myTruck = truckCreator.factoryMethod("280181");
    const myBoat = boatCreator.factoryMethod("280181");
    myTruck.printTag();
    myBoat.printTag();    
}


/*
    ABSTRACT FACTORY
*/
export function abstractFactory() {
    const factory = new FurnitureFactory();
    const boat = factory.createBoat("280181");
    const truck = factory.createTruck("280181"); 
}

/*
    BUILDER PATTERN
*/
export function builder() {
    const houseBuilder = new HouseBuilder();
    const carBuilder = new CarBuilder();
    //making builder build step by step
    houseBuilder.buildStepA();
    const crapHouse = houseBuilder.getResult();
    console.log(crapHouse);
    //using director
    const director = new Director(houseBuilder);
    const house = director.make(0);
    console.log(house);
    director.changeBuilder(carBuilder);
    const car = director.make(1);
    console.log(car);    
}


/*
    PROTOTYPE PATTERN
*/
export function prototype() {
    const p1 = new Product();
    p1.field = "Ciao!";
    const p2 = p1.clone();
    console.log(p1);
    console.log(p2);    
}


/*
    SINGLETON PATTERN
*/
export function singleton () {
    const instance = Singleton.getInstance();
    const instance2 = Singleton.getInstance();
    if(instance === instance2) console.log("Singleton works!")
}
