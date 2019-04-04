'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
class RESTServer {
    constructor() {
        this.dataStore = [];
        this.headers = {
            'Content-Type': 'text/plain',
            'Connection': 'Keep-Alive'
        };
        let server = new http_1.Server((request, response) => {
            this.retrieveData(request, (data) => {
                if (request.method == "POST") {
                    if (this.dataStore.length > 1) {
                        process.exit(1);
                    }
                    this.dataStore.push(data);
                    console.log(this.dataStore.length + ': ' + data);
                    response.writeHead(200, this.headers);
                    response.end();
                }
                else if (request.method == "GET") {
                    response.writeHead(200, this.headers);
                    response.write(JSON.stringify(this.dataStore.pop()), () => {
                        response.end();
                    });
                }
                else {
                    response.end();
                }
            });
        });
        server.listen(3001);
    }
    retrieveData(request, callback) {
        let retData = "";
        request.on('data', (chunk) => {
            retData = retData + chunk;
        });
        request.on('end', () => {
            callback(retData);
        });
    }
}
let RESTServerInstance = new RESTServer();
