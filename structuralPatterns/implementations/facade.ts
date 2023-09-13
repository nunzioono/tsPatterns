interface System {
    doSomething(): string;
}

class System1 implements System {
    doSomething(): string {
        return "Something on system 1"
    }
}

class System2 implements System {
    doSomething(): string {
        return "Something on system 2"
    }
}

export class Facade {
    sysRefTo1: System1;
    sysRefTo2: System2;

    constructor(ref1: System1 = new System1(), ref2: System2 = new System2()) {
        this.sysRefTo1 = ref1;
        this.sysRefTo2 = ref2;
    }

    operation() {
        return this.sysRefTo1.doSomething() + " " + this.sysRefTo2.doSomething()
    }
}