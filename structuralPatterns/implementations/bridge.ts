export class Abstraction {
    private implementation: Implementation;

    constructor(implementation: Implementation) {
        this.implementation = implementation;
    }

    operation() : string {
        return this.implementation.abstractOperation();
    }
}

export interface Implementation {
    abstractOperation(): string;
}