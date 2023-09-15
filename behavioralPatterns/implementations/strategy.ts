
export interface Strategy {

    execute(a: number, b: number): void;
}

export class Executor {
    private strategy: Strategy;

    constructor(s: Strategy) {
        this.setStrategy(s);
    }

    setStrategy(s: Strategy) {
        this.strategy = s;
    }

    execute(a: number, b: number) {
        const start = performance.now();
        this.strategy.execute(a,b);
        const end = performance.now();
        console.log("Strategy "+this.strategy.constructor.name+" took "+Math.floor((end-start)*100)/100+"s to execute!");
    }
}