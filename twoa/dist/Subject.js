"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const buffer_1 = require("buffer");
class Subject {
    constructor() {
        this.httpAgent = new http_1.Agent({
            keepAlive: true
        });
        this.observers = [];
        this.filters = [];
        this.httpAgent.maxSockets = 1;
    }
    addFilter(filter) {
        this.filters.push(filter);
    }
    register(observer) {
        this.observers.push(observer);
    }
    notifyAll() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.observers.length; i++) {
                yield this.observers[i].notify();
            }
        });
    }
    makeRow(verbose) {
        return __awaiter(this, void 0, void 0, function* () {
            let input = "\{";
            this.filters.forEach(function (filter) {
                input = filter.generate(input);
            });
            let body = input.slice(0, input.length) + "'verbose': " + verbose + "\}";
            yield this.postData(body);
        });
    }
    postData(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let requestOptions = {
                    hostname: 'localhost',
                    port: 3001,
                    path: '/data',
                    method: 'POST',
                    headers: {
                        'Content-Length': buffer_1.Buffer.byteLength(body),
                        'Content-Type': 'text/plain',
                        'Connection': 'Keep-Alive'
                    },
                    agent: this.httpAgent
                };
                let retry = () => __awaiter(this, void 0, void 0, function* () {
                    yield setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        yield this.postData(body);
                    }), 100);
                });
                const httpRequest = http_1.request(requestOptions, (response) => {
                    response.on('data', () => { });
                    response.on('end', () => {
                        this.notifyAll().then(() => {
                            resolve();
                        });
                    });
                }).on('error', yield retry);
                httpRequest.write(body);
                httpRequest.end();
                httpRequest.on('error', (err) => {
                    console.log(err);
                });
            }));
        });
    }
}
exports.Subject = Subject;
