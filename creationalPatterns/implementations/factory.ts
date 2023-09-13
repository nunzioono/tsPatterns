interface Trasportation {
    tag: string;
    planDelivery()
    printTag()
}

export class Truck implements Trasportation {
    tag: string;

    constructor(myTag: string) {
        if(myTag) this.tag='t'+myTag;
    }

    planDelivery() {
        
    }

    printTag() {
        console.log(this.tag)
    }
}

export class Boat implements Trasportation {
    tag: string;
    
    constructor(myTag: string) {
        if(myTag) this.tag='b'+myTag;
    }

    planDelivery() {
        
    }

    printTag() {
        console.log(this.tag)
    }
}
