import express from "express"
import fetch from "isomorphic-fetch"

export default class Example {
    public app: any | express.Application;
    public server: any;
    constructor() {
        let self = this;
        self.routes = self.routes();
    }
    public sayHello() {
        console.log("Hello");
    }
    public routes: any = function() {
        let self = this;
        return {
            get: {
                '/': self.sayHello
            }
        };
    }
    public setRoutes(): void {
        let self = this;
        let routes = self.routes;
        for ( let method in routes ) {
            for ( let route in routes[method] ) {
                self.app[method]( route, routes[method][route] );
            }
        }
    }
    public async init( port: number = 3000 ): Promise<void> {
        let self = this;
        self.app = express();
        self.setRoutes();
        self.server = self.app.listen(port, () => {
            console.log(`Example app listening on port ${port}!`);
        });
    }
}

// list = [1,2,3];
// list of objects = [{ "a": "1"},{"b", "2"},{"c": "3"}]
export const tests: any [] = [{
    name: "Examlpe init",
    context: function() {
        //Instantiate the example application.
        return new class mock extends Example {
            public setRoutes: any = function() {
                let self = this;
                self.app.get("/", function( req: any, res: any ) {
                    res.send(`Hello from port ${self.server.address().port}!`);
                });
                
            }   
        }();
    },
    input: [ 3000 ],
    function: async function( port: any ) {
        let example: Example = this;
        //Initiate the web application server.
        await example.init( port );
        //Run a request.
        let response: any = await fetch('http://localhost:3000/');
        let result = "";
        //Get the response text.
        if ( response.status == 200 ) {
            result = await response.text();
        }

        //This is so that the server doesn't stay running after the test is complete.
        example.server.close();
        return result;
    },
    output: "Hello from port 3000!",
    debug: true,
    run: false
}, {
    name: "Example setRoutes",
    context: function() {
        return new class mock extends Example {
            public app: any = {
                get: function() {},
            };
        }();
    },
    input: [],
    function: function() {
        let example: Example = this;
        // example.setRoutes();
        // console.log( layer.route.path; );
        // console.log();

    },
    output: true,
    debug: true,
    run: false
}];