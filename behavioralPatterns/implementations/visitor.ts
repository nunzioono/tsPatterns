interface VisitorInterface {
    visit(e: Element): void;
}

export interface Element {
    accept(v: Visitor);
}

export abstract class Visitor implements VisitorInterface {

    abstract visit(e: Element): void;

}