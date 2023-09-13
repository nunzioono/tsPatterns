interface Component {
    readSomeValue() : string;
}

export class Product implements Component {

    readSomeValue() : string {
        return "product";
    }
}

export class Decorator implements Component {
    component: Component;

    constructor (component: Component) {
        this.component = component;
    }

    readSomeValue(): string {
        return this.component.readSomeValue()+" decorated";    
    }

}