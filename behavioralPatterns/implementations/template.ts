export abstract class Template {

    constructor() {
        this.buildFloors();
        this.buildWalls();
        this.buildRoofs();
        this.buildWindows();
        this.buildGarage();
        this.buildPatio();
        this.buildSwimmingPool();
        this.buildGarden();
    }

    protected buildFloors() {
        console.log("General Worker: I'm building floors");
    }

    protected buildWalls() {
        console.log("General Worker: I'm building walls");
    }

    protected buildRoofs() {
        console.log("General Worker: I'm building roofs");
    }

    //these methods must be extended from subclasses
    protected abstract buildWindows();

    //these methods can be extended otherwise will do nothing
    protected buildGarage() {};

    protected buildPatio() {};

    protected buildSwimmingPool() {};

    protected buildGarden() {};
}

