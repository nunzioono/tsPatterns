export interface Mediator {
    notify(sender: object, event: string): void;
}

export class System {
    mediator: Mediator;

    constructor(m?: Mediator) {
        this.mediator = m!;
    }

    setMediator(m: Mediator) {
        this.mediator = m;
    }

}