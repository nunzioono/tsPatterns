import { Handler } from "./implementations/chainOfResponsibility";
import { Invoker, Receiver, Command } from "./implementations/command";
import { IterableCollection, IteratorInterface } from "./implementations/iterator";
import { Mediator, System } from "./implementations/mediator";
import { Snapshot, Weather, History } from "./implementations/memento";
import { Publisher, Subscriber } from "./implementations/observer";
import { Context, State } from "./implementations/state";
import { Executor, Strategy } from "./implementations/strategy";
import { Template } from "./implementations/template";
import { Element, Visitor } from "./implementations/visitor";

export function chainOfResponsibility() {
    class BigBear implements Handler {
        next: Handler;
    
        handle(request: string) {
            if(request.includes("big"))
                return "It was a big sized meal!"
            return this.next.handle(request);
        }
    
        setNext(handler: Handler): Handler {
            this.next = handler;
            return handler;
        }
    }
    
    class MiddleBear implements Handler {
        next: Handler;
    
        handle(request: string) {
            if(request.includes("medium"))
                return "It was a middle sized meal!";
    
            return this.next.handle(request);
        }
    
        setNext(handler: Handler): Handler {
            this.next = handler;
            return handler;
        }
    }
    
    class LittleBear implements Handler {
        next: Handler;
    
        handle(request: string) {
            if(request.includes("little"))
                return "It was a little sized meal"
            
            return this.next.handle(request);;
        }
    
        setNext(handler: Handler): Handler {
            this.next = handler;
            return handler;
        }
    }

    let meal = "Who wants a big meal?";
    const bigbear = new BigBear();
    const middlebear = new MiddleBear();
    const littlebear = new LittleBear();

    bigbear.setNext(middlebear).setNext(littlebear);
    console.log(bigbear.handle(meal));
    meal = "Who wants a little meal?";
    console.log(bigbear.handle(meal));
}

export function command() {
    class WarCommand implements Command {
        private payload: string;
        private receiver: Receiver;
    
        constructor(payload: string, receiver: Receiver) {
            this.payload = payload;
            this.receiver = receiver;
        }
    
        execute() {
            console.log('Doing '+this.payload);
            this.receiver.doSomething(this.payload)
        }
    }
    
    class Soldier extends Receiver {
        doSomething(cmd: string): void {
            console.log("Received: "+cmd);
        }
    }

    class General extends Invoker {
        params: Array<string>;

        constructor(receiver: Receiver, ...params) {
            super();
            this.params = [...params];
            const len = params.length;
            if(len > 1) {
                const cmd1 = new WarCommand(this.params[0],receiver);
                const cmd2 = new WarCommand(this.params[1],receiver);
                if(super.isCommand(cmd1)) super.onStartAction = cmd1;
                if(super.isCommand(cmd2)) super.onEndAction = cmd2;
            }
        }

    }

    const soldier = new Soldier();
    const general = new General(soldier,"start","end");
    general.start();
    general.end();
}

export function iterator() {
    class Collection implements IterableCollection {

        private items: Array<number>;
    
        constructor () {
            this.items = new Array<number>();
        }

        add(e: number) {
            this.items.push(e);
        }

        length(): number {
            return this.items.length;
        }
        
        at(index: number): number | undefined {
            return this.items.at(index);
        }
    
        createIterator(): Iterator {
            return new Iterator(this);
        }
    }
    
    class Iterator implements IteratorInterface {
    
        collection: Collection;
        iterationState: number;
    
        constructor(collection: Collection) {
            this.collection = collection;
            this.iterationState = -1;
        }
    
        hasMore(): boolean {
            return this.collection.length() - this.iterationState > 0;
        }
    
        getNext(): number | undefined {
            if(this.hasMore())
                return this.collection.at(++this.iterationState);
        }
    
    }

    const collection = new Collection();
    collection.add(1);
    collection.add(2);
    collection.add(3);
    const iterator = new Iterator(collection);
    console.log(iterator.getNext())
    console.log(iterator.getNext())
    console.log(iterator.getNext())

}

export function mediator() {
    class Kicker extends System {
        strikePenalty() {
            if(Math.random()>=0.5) {
                console.log("Attacker: 3..2..1.. It's a goal!");
                this.mediator.notify(this,"goal");
            }
            else {
                console.log("Attacker: ............");
                this.mediator.notify(this,"penaltyMissed");
            }
        }
    
        staySilent() {
            console.log("Attacker: ..............");
        }
    }
    
    class Defender extends System {
        tackle() {
            console.log("Defender: Tackle on the striker!");            
            if(Math.random()>=0.5) {
                this.mediator.notify(this,"faul");
            }
            else
                this.mediator.notify(this,"tackle");
        }
    
        staySilent() {
            console.log("Defender: ..............");
        }
    }
    
    class Referee implements Mediator {
        public kicker: Kicker;
        public defender: Defender;
        private scoreA: number;
        private scoreB: number;
    
        constructor(k: Kicker, d: Defender) {
            this.kicker = k;
            this.defender = d;
            console.log("Referee: The game starts, its 0 : 0. No fauls will be allowed!")
            this.scoreA = 0;
            this.scoreB = 0;
        }
    
        notify(sender: object, event: string): void {
            if(event == "faul" && sender instanceof Defender) {
                console.log("Referee: It's a penalty!");
                this.kicker.strikePenalty();
            }
            if(event == "goal" && sender instanceof Kicker) {
                this.scoreA++;
                console.log("Referee: New score is "+this.scoreA+" : "+this.scoreB);
                this.defender.staySilent();
            }
            if(event == "tackle" && sender instanceof Defender) {
                console.log("Referee: This tackle is no faul! The game goes on...");
                this.scoreB++;
                console.log("Referee: The team B has score on counterattack. New score is "+this.scoreA+" : "+this.scoreB);
            }
            if(event == "penaltyMissed" && sender instanceof Kicker) {
                console.log("Referee: Score does not change...");
            }
        }
    }

    const chiellini = new Defender();
    const cr7 = new Kicker();
    const irrati = new Referee(cr7,chiellini);
    chiellini.setMediator(irrati);
    cr7.setMediator(irrati);
    chiellini.tackle();
    cr7.strikePenalty();
}

export function memento() {

    const weather = new Weather();
    const weatherHistory = new History(weather);
    weather.randomWeather();
    weatherHistory.backup();
    weather.randomWeather();
    weatherHistory.backup();
    weather.randomWeather();
    weatherHistory.backup();
    weather.randomWeather();
    weatherHistory.backup();
    weatherHistory.undo();
    weatherHistory.undo();
}

export function observer() {

    const sub1 = new Subscriber("Aldo");
    const sub2 = new Subscriber("Giovanni");
    const sub3 = new Subscriber("Giacomo");
    const publisher = new Publisher();
    publisher.subscribe("Tu la conosci Claudia?",sub1);
    publisher.subscribe("Tu la conosci Claudia?",sub2);
    publisher.subscribe("Tu la conosci Claudia?",sub3);
    publisher.notify("Tu la conosci Claudia?","A new review says this film has registered a total 16M euros");
    publisher.subscribe("Palermo Today",sub1);
    publisher.notify("Palermo Today","A Fiat 500 was stolen but cops got the thieves");
}

export function state() {
    enum WaterFisicState {
        Liquid,
        Solid,
        Gas
    }
    
    class WaterState extends State {
        userContext: Context;
        fisicState: WaterFisicState;
    
        constructor(fisicState: WaterFisicState) {
            super();
            this.fisicState = fisicState;
        }
    
        setContext(ctx: Context) {
            this.userContext = ctx;
        }
    
        isDrinkable(): boolean {
            return this.fisicState == WaterFisicState.Liquid;
        }
    
        isEatable(): boolean {
            return this.fisicState == WaterFisicState.Solid;
        }
    
        isBreathable(): boolean {
            return this.fisicState == WaterFisicState.Gas;
        }
    }
    
    class UserContext extends Context {
    
        state: WaterState;

        constructor(state: WaterState) {
            super();
            this.changeState(state);
            this.state.setContext(this);
        }

        changeState(state: WaterState): void {
            this.state = state;
            console.log("Now the state is: "+WaterFisicState[state.fisicState].toString());
            console.log("Can user drink the water if it is "+WaterFisicState[this.state.fisicState].toString()+"?"+this.canDrink());
            console.log("Can user eat the water if it is "+WaterFisicState[this.state.fisicState].toString()+"?"+this.canEat());
            console.log("Can user breath the water if it is "+WaterFisicState[this.state.fisicState].toString()+"?"+this.canBreath());        
        }
    
    
        canDrink(): boolean {
            return this.state.isDrinkable();
        }
    
        canEat(): boolean {
            return this.state.isEatable();
        }
    
        canBreath(): boolean {
            return this.state.isBreathable();
        }
    }
    
    let water = new WaterState(WaterFisicState.Liquid);
    const baby = new UserContext(water);
    baby.changeState(new WaterState(WaterFisicState.Solid));
    baby.changeState(new WaterState(WaterFisicState.Gas));
}

export function strategy() {
    class MultiplicationStrategy implements Strategy {
        execute(a: number, b: number): void {
            let c: number = 1;
            for(let i in [...Array(b).keys()]) {
                c*=a;
            }
            console.log(this.constructor.name+" resulted in: "+c.toString());
        }
    }

    class PowerStrategy implements Strategy {
        execute(a: number, b: number): void {
            console.log(this.constructor.name+" resulted in: "+Math.pow(a,b).toString());
        }
    }

    const mul: Strategy = new MultiplicationStrategy();
    const pow: Strategy = new PowerStrategy();
    const executor = new Executor(mul);
    executor.execute(2,3);
    executor.setStrategy(pow);
    executor.execute(2,3)
}

export function template() {
    class SimpleHouseBuilding extends Template {

        protected buildWindows() {
            console.log("Glass Specialized Worker: I'm now building the windows");
        }
    
    }
    
    class ComodityHouseBuilding extends SimpleHouseBuilding {
        protected buildPatio(): void {
            console.log("Wood Specialized Worker: I'm now building the patio");
        }
    
        protected buildGarage(): void {
            console.log("Strong Workers: We are now building the garage");
        }
    }
    
    class LuxuryHouseBuilding extends ComodityHouseBuilding {
        protected buildGarden(): void {
            console.log("Gardener: I'm now building a garden");    
        }
    
        protected buildSwimmingPool(): void {
            console.log("Pool Specialist: I'm now installing the pool");
        }
    }

    console.log("Here a list of the buildings for different clients we had:");
    console.log("1.-----Client asked for a simple house-----");
    new SimpleHouseBuilding();
    console.log("2.-----Client asked for a luxury house-----");
    new LuxuryHouseBuilding();
    console.log("3.-----Client asked for an house with some comodities-----");
    new ComodityHouseBuilding();
}

export function visitor() {
    class AppleTree implements Element {
    
        accept(v: Visitor) {
            v.visit(this);
        }
    }

    class PearTree implements Element {
    
        accept(v: Visitor) {
            v.visit(this);            
        }
    }

    class Farmer extends Visitor {
    
        visit(e: Element): void {
            if(e.constructor.name == "AppleTree") {
                console.log("I'm going to pick apples");
            }
            else if (e.constructor.name == "PearTree") {
                console.log("I'll pick pears");
            }
        }
    }

    const apples = new AppleTree();
    const pears = new PearTree();
    const farmer = new Farmer();
    farmer.visit(apples);
    farmer.visit(pears);
}