interface Trasportation {
    tag: string;
    planDelivery()
}

export abstract class Transport implements Trasportation {
    tag: string;

    planDelivery() {
        
    }
}