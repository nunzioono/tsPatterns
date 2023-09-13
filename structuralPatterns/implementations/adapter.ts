export class Target {
    public something(): string {
        return "this target does something!";
    }
}

export class Adaptee {
    public somethingAdapted(): string {
        return "THIS TARGET DOES SOMETHING!";
    }
}

export class Adapter extends Target {
    private adaptee: Adaptee;

    constructor(adaptee: Adaptee) {
        super();
        this.adaptee = adaptee;
    }

    public something(): string {
        return this.adaptee.somethingAdapted().toLowerCase();
    }
}