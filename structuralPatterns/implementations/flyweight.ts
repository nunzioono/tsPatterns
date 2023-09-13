export class Flyweight {
    name: string;
    code: string;

    constructor(name,code) {
        this.name = name;
        this.code = code;
    }
}

export class MutingFlyweight {
    definition: Flyweight | undefined;
    year: number;
    attendees: number;
    teacher: string;
    credits: number;

    constructor(exam,year,attendees,teacher,credits) {
        this.definition = exam;
        this.year = year;
        this.attendees = attendees;
        this.teacher = teacher;
        this.credits = credits;
    }
}

export class HeavyClass {
    name: string;
    code: string;
    year: number;
    attendees: number;
    teacher: string;
    credits: number;

    constructor(name,code,year,attendees,teacher,credits) {
        this.name = name;
        this.code = code;
        this.year = year;
        this.attendees = attendees;
        this.teacher = teacher;
        this.credits = credits;
    }
}