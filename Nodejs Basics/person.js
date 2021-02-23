class Person {
    constructor(name, age){
        this.name = name; 
        this.age = age; 
    }

    greeting(){
        console.log(`My name is ${this.name} and I am ${this.age}`); 
    }
}

module.exports = Person;


// Module wrapper function
// (function(exports, require, module, __dirname, __filename){})