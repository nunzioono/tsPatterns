import { Adaptee, Adapter, Target } from "./implementations/adapter";
import { Abstraction, Implementation } from "./implementations/bridge";
import { Composite, Leaf } from "./implementations/composite";
import { Decorator, Product } from "./implementations/decorator";
import { Facade } from "./implementations/facade";
import { Flyweight, HeavyClass, MutingFlyweight } from "./implementations/flyweight";
import { ProxyService, RealService } from "./implementations/proxy";
const sizeof = require("object-sizeof");

export function adapter() {
    const lowerText = new Target();
    const upperText = new Adaptee();
    const adaptedToLower = new Adapter(upperText);// The adapter class extends the target class so they should be of the same type
    if(lowerText instanceof Target && adaptedToLower instanceof Target) console.log("Now the two classes are constructed in the same way!")
}

export function bridge() {
    class ConcreteImplementation implements Implementation {
        abstractOperation(): string {
            return "I make something with the controller without knowing how the device is made inside!"
        }
    }
    const device = new ConcreteImplementation();
    const remoteController = new Abstraction(device);
    console.log(remoteController.operation());
}

export function composite() {
    const tree = new Composite();
    const leaf1 = new Leaf("1");
    tree.add(leaf1);
    const leaf2 = new Composite();
    const leaf3 = new Leaf("2");
    const leaf4 = new Leaf("3");
    leaf2.add(leaf3);
    leaf2.add(leaf4);
    tree.add(leaf2);
    console.log(tree.execute()); //The whole scope of this pattern is to simply execute a method on each leaf without changing the main code!
}

export function decorator() {
    const p1 = new Product();
    const betterP1 = new Decorator(p1);
    console.log(betterP1.readSomeValue()) //The decorator class allows to extend methods without changing the original product
}

export function facade() {
    const facade = new Facade();
    console.log(facade.operation()); //In this example the facade simplifies the use of the system1 and system2 making them also trasparent
}

export function flyweight() {
    const exam = new Flyweight("Algorithm and programming","APA");
    const currentExam = new MutingFlyweight(exam,2023,200,"My teacher",12);
    const futureExam = new MutingFlyweight(exam,2024,210,"A future teacher",12);
    const moreFutureExam = new MutingFlyweight(exam,2025,202,"We never know who",12);
    const size1 = sizeof(exam)+sizeof(currentExam)+sizeof(futureExam)+sizeof(moreFutureExam);
    const heavyCurrent = new HeavyClass("Algorithm and programming","APA",2023,200,"My teacher",12);
    const heavyFuture = new HeavyClass("Algorithm and programming","APA",2024,210,"A future teacher",12);
    const heavyMoreFuture = new HeavyClass("Algorithm and programming","APA",2025,202,"We never know who",12);
    const size2 = sizeof(heavyCurrent)+sizeof(heavyFuture)+sizeof(heavyMoreFuture);
    if(size1 < size2)
        console.log("Flyweight pattern works!") //Flyweight can be seen as a pattern but also as a code optimization, be aware that using an envoirment that caches object the behaviour of this code can be alterated
    //Obviously storing only references to immutable classes is more convenient that saving same data multiple times
}

export function proxy() {
    const service = new RealService();
    const proxy = new ProxyService(service);
    console.log(proxy.readData()); // Proxy pattern is developed to make the class proxy work instead of service for whatever reason is needed
}