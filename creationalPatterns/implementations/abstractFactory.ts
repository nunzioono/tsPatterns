interface Chair {
    doSomething();
}

interface Sofa {
    doSomething();
}

interface Table {
    doSomething();
}

class VictorianChair implements Chair {
    doSomething() {
        
    }
}

class ModernChair implements Chair {
    doSomething() {
        
    }
}

class DecoChair implements Chair {
    doSomething() {
        
    }
}

class VictorianSofa implements Sofa {
    doSomething() {
        
    }
}

class ModernSofa implements Sofa {
    doSomething() {
        
    }
}

class DecoSofa implements Sofa {
    doSomething() {
        
    }
}

class VictorianTable implements Table {
    doSomething() {
        
    }
}

class ModernTable implements Table {
    doSomething() {
        
    }
}

class DecoTable implements Table {
    doSomething() {
        
    }
}

interface FurnitureFactory {
    createChair(): Chair;
    createSofa(): Sofa;
    createTable(): Table;
}

export class VictorianFactory implements FurnitureFactory {
    createChair(): Chair {
        return new VictorianChair();
    }
    createSofa(): Sofa {
        return new VictorianSofa();
    }
    createTable(): Table {
        return new VictorianTable();
    }
}

export class ModernFactory implements FurnitureFactory {
    createChair(): Chair {
        return new ModernChair();
    }
    createSofa(): Sofa {
        return new ModernSofa();
    }
    createTable(): Table {
        return new ModernTable();
    }
}

export class DecoFactory implements FurnitureFactory {
    createChair(): Chair {
        return new DecoChair();
    }
    createSofa(): Sofa {
        return new DecoSofa();
    }
    createTable(): Table {
        return new DecoTable();
    }
}