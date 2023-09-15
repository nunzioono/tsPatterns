import * as behavioralPatterns from "./behavioralPatterns";
import * as creationalPatterns from "./creationalPatterns"
import * as structuralPatterns from "./structuralPatterns";

/*
    CREATIONAL PATTERNS EXAMPLES
*/
for(const fun of Object.values(creationalPatterns)) {
    console.log("\n\n\n---'"+fun.name+"' call results---");
    fun();
}

/*
    STRUCTURAL PATTERNS EXAMPLES
*/
for(const fun of Object.values(structuralPatterns)) {
    console.log("\n\n\n---'"+fun.name+"' call results---");
    fun();
}

/*
    BEHAVIOURAL PATTERNS EXAMPLES
*/
for(const fun of Object.values(behavioralPatterns)) {
    console.log("\n\n\n---'"+fun.name+"' call results---");
    fun();
}