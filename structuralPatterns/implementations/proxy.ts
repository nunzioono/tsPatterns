interface Service {
    someData: string;
    
    readData(): string;
}

export class RealService implements Service{
    someData: string;

    constructor() {
        this.someData = "Some data!"
    }

    readData(): string {
        return this.someData;
    }
}

export class ProxyService implements Service{
    someData: string;
    realService: RealService;
    needReset: boolean;

    constructor(realService: RealService) {
        this.realService = realService;
        this.needReset = false;
    }

    readData(): string {
        if(!this.someData || this.needReset)
            this.someData = this.realService.readData();
        return this.someData;
    }

}