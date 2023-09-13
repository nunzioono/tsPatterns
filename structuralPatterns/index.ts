import { Adaptee, Adapter, Target } from "./implementations/adapter";

export function adapter() {
    const lowerText = new Target();
    const upperText = new Adaptee();
    const adaptedToLower = new Adapter(upperText);
    if(lowerText.constructor.name == adaptedToLower.constructor.name) console.log("Now the two classes are constructed in the same way!")
}
