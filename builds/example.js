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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tests = void 0;
const express_1 = __importDefault(require("express"));
const isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
class Example {
    constructor() {
        this.routes = function () {
            let self = this;
            return {
                get: {
                    '/': self.sayHello
                }
            };
        };
        let self = this;
        self.routes = self.routes();
    }
    sayHello() {
        console.log("Hello");
    }
    setRoutes() {
        let self = this;
        let routes = self.routes;
        for (let method in routes) {
            for (let route in routes[method]) {
                self.app[method](route, routes[method][route]);
            }
        }
    }
    init(port = 3000) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            self.app = (0, express_1.default)();
            self.setRoutes();
            self.server = self.app.listen(port, () => {
                console.log(`Example app listening on port ${port}!`);
            });
        });
    }
}
exports.default = Example;
exports.tests = [{
        name: "Examlpe init",
        context: function () {
            return new class mock extends Example {
                constructor() {
                    super(...arguments);
                    this.setRoutes = function () {
                        let self = this;
                        self.app.get("/", function (req, res) {
                            res.send(`Hello from port ${self.server.address().port}!`);
                        });
                    };
                }
            }();
        },
        input: [3000],
        function: function (port) {
            return __awaiter(this, void 0, void 0, function* () {
                let example = this;
                yield example.init(port);
                let response = yield (0, isomorphic_fetch_1.default)('http://localhost:3000/');
                let result = "";
                if (response.status == 200) {
                    result = yield response.text();
                }
                example.server.close();
                return result;
            });
        },
        output: "Hello from port 3000!",
        debug: true,
        run: false
    }, {
        name: "Example setRoutes",
        context: function () {
            return new class mock extends Example {
                constructor() {
                    super(...arguments);
                    this.app = {
                        get: function () { },
                    };
                }
            }();
        },
        input: [],
        function: function () {
            let example = this;
        },
        output: true,
        debug: true,
        run: false
    }];
//# sourceMappingURL=example.js.map