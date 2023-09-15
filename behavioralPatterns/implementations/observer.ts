interface SubscriberInterface {
    update(subject: string, data: string);
}

interface PublisherInterface {
    notify(subject: string,data: string);
    subscribe(subject: string, subscriber: Subscriber);
    unsubscribe(subject: string, subscriber: Subscriber);
}

export class Subscriber implements SubscriberInterface {
    name: string;
    
    constructor(name: string) {
        this.name = name;
    }

    update(subject: string, data: string) {
        console.log(this.name+": I've received a new update about "+subject+": "+data);
    }
}

export class Publisher implements PublisherInterface {
    private subjectSubscribers: Map<string, Subscriber[]>;

    constructor() {
        this.subjectSubscribers = new Map<string, Subscriber[]>();
    }

    notify(subject: string, data: string) {
        this.subjectSubscribers?.get(subject)?.forEach((sub?: Subscriber | undefined) => {
            sub?.update(subject,data);
        })
    }

    subscribe(subject: string, subscriber: Subscriber) {
        const subs: Subscriber[] | undefined = this.subjectSubscribers.get(subject);
        const len = subs == undefined? 1: subs.length + 1;
        const newSubs: Subscriber[] = new Array<Subscriber>(len); 
        if(subs == undefined){
            newSubs.push(subscriber);
        }
        else {            
            newSubs.push(...subs,subscriber);
        }
        this.subjectSubscribers.set(subject, newSubs);

    }

    unsubscribe(subject: string, subscriber: Subscriber) {
        const subs = this.subjectSubscribers.get(subject);
        if(subs) {
            const index = subs.indexOf(subscriber);
            subs!.splice(index,1);
            this.subjectSubscribers.set(subject, [...subs]);
        }
    }
}