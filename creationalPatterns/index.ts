import { Truck, Boat } from "./implementations/factory";
import { concreteTruckCreator, concreteBoatCreator } from "./implementations/concreteFactory";
import { VictorianFactory, ModernFactory, DecoFactory } from "./implementations/abstractFactory";
import { HouseBuilder, CarBuilder, Director } from "./implementations/builder";
import { Product } from "./implementations/prototype";
import { Singleton } from "./implementations/singleton";


/*
    FACTORY PATTERN
*/
export function factory() {
    const myTruck = new Truck('280181');
    myTruck.printTag();
    const myBoat = new Boat('280181');
    myBoat.printTag();    
}

/*
    CONCRETE FACTORY
*/
export function concreteFactory() {
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
    const myVictorianFactory = new VictorianFactory();
    const myModernFactory = new ModernFactory();
    const myDecoFactory = new DecoFactory();
    const chair = myVictorianFactory.createChair();
    const sofa = myVictorianFactory.createSofa();
    const table = myVictorianFactory.createTable();
    const chair2 = myModernFactory.createChair();
    const sofa2= myModernFactory.createSofa();
    const table2 = myModernFactory.createTable();
    const chair3 = myDecoFactory.createChair();
    const sofa3 = myDecoFactory.createSofa();
    const table3 = myDecoFactory.createTable();
    
    console.log(chair.constructor.name)
    console.log(sofa.constructor.name)
    console.log(table.constructor.name)
    console.log(chair2.constructor.name)
    console.log(sofa2.constructor.name)
    console.log(table2.constructor.name)
    console.log(chair3.constructor.name)
    console.log(sofa3.constructor.name)
    console.log(table3.constructor.name)    
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
