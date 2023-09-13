abstract class Prototype {

    abstract clone(): Prototype;
}

export class Product extends Prototype {
    field: string;

    clone(): Product{
        return Object.create(this);
    }
}
