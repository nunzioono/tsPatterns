interface Component {
    execute(): string;
}

export class Leaf implements Component {
    someValue: string;

    constructor(value: string) {
        this.someValue = value;
    }

    execute(): string {
        return this.someValue;
    }
}

export class Composite implements Component {
    children: Array<Component>

    constructor() {
        this.children = new Array<Component>();
    }

    add(component: Component) {
        this.children.push(component);
    }

    remove(component: Component) {
        let index = this.children.indexOf(component);
        this.children.splice(index,1);
        
    }

    getChildren(): Array<Component> {
        return this.children;
    }

    execute(): string {
        let result: string = ""
        for(let child of this.children) {
            result+= child.execute();
        }
        return result;
    }
}