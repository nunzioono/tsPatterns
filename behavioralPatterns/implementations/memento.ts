enum State {
    Rainy,
    Sunny,
    Windy,
    Calm
}

interface Memento {
    getName(): string;
    getSnapshotDate(): string;
}

export class Snapshot implements Memento {
    name: string;
    date: string;

    constructor(name: string, date: string) {
        this.name = name;
        this.date = date;
    }

    getName(): string {
        return this.name;
    }

    getSnapshotDate(): string {
        return this.date;
    }
}

export class Weather {
    state: State;

    constructor() {
        this.randomWeather();
    }

    getState() : string {
        return State[this.state];
    }

    randomWeather() {
        this.state = Math.floor(Math.random()*4);
        console.log("New state is: "+ State[this.state]);
    }
}

export class History {
    snapshots: Array<Snapshot>;
    actual: Weather;

    constructor(w: Weather) {
        this.actual = w;
        this.snapshots = new Array<Snapshot>();
    }

    backup() {
        const s = new Snapshot(this.actual.getState(), new Date().toISOString().substring(0,9));
        this.snapshots.push(s);
    }

    undo() {
        this.actual.state = State[this.snapshots.at(-2)!.getName()];
        this.snapshots.pop();
        console.log("Undone now the state is: "+State[this.actual.state]);
    }
}
