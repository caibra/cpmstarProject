import test from "@ogginger/testsuite"
import * as example from "./example"

async function wait(callback: any) {
    setTimeout(callback, 1000);
}
function roundOff( index: number ) {
    if ( index == 0 ) {
        console.log("First");
    } else if ( index == 1 ) {
        console.log("Second");
    } else {
        console.log("Third");
    }
}
function sum( a: number, b: number ) {
    return a + b;
}
function sumMethod( b: number, c: number ) {
    return this.a + b + c;
}
class Calculator {
    public a: number;
    public sum: any; //undefined
    public name: string = 'Josh';

    public sayHello() {
        console.log(`Hello my name is ${this.name}`);
    }
}
Calculator.prototype.sum = sumMethod; //Here is where it becomes defined.


async function main() {
    let sumWith1 = sum.bind(undefined, 1 );
    console.log(sumWith1(2)); //3
    let calc = new Calculator();


    calc.sayHello()
    calc.sayHello.bind({name: 'Jasmine'})()


    let addFive = sum.bind(undefined, 5);
    console.log(addFive(1));

    let someRandomOtherObject = {
        a: 1
    };
    calc.a = 1;
    // console.log(calc.sum(2,3)); //calc.sum(b,c)
    console.log(calc.sum.bind(someRandomOtherObject,2,3)()); //someRandomOtherObject.sum(b,c)


    // let index = 0;
    // roundOff(index++);
    // await wait(roundOff.bind(undefined, index++));
    // roundOff(index++);

    // await test( example.tests );
}
main().catch((err) => {
    console.error(err);
});