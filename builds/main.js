"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function wait(callback) {
    return __awaiter(this, void 0, void 0, function* () {
        setTimeout(callback, 1000);
    });
}
function roundOff(index) {
    if (index == 0) {
        console.log("First");
    }
    else if (index == 1) {
        console.log("Second");
    }
    else {
        console.log("Third");
    }
}
function sum(a, b) {
    return a + b;
}
function sumMethod(b, c) {
    return this.a + b + c;
}
class Calculator {
    constructor() {
        this.name = 'Josh';
    }
    sayHello() {
        console.log(`Hello my name is ${this.name}`);
    }
}
Calculator.prototype.sum = sumMethod;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let sumWith1 = sum.bind(undefined, 1);
        console.log(sumWith1(2));
        let calc = new Calculator();
        calc.sayHello();
        calc.sayHello.bind({ name: 'Jasmine' })();
        let addFive = sum.bind(undefined, 5);
        console.log(addFive(1));
        let someRandomOtherObject = {
            a: 1
        };
        calc.a = 1;
        console.log(calc.sum.bind(someRandomOtherObject, 2, 3)());
    });
}
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=main.js.map