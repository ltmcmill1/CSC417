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
class Observer {
    constructor(subject) {
        this.subject = subject;
        this.httpAgent = new http_1.Agent({
            keepAlive: true
        });
        this.subject = subject;
        this.subject.register(this);
        this.httpAgent.maxSockets = 1;
    }
    notify() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let data = yield this.getData();
                console.log(data);
                resolve();
            }));
        });
    }
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let requestOptions = {
                    hostname: 'localhost',
                    port: 3001,
                    path: '/data',
                    method: 'GET',
                    agent: this.httpAgent
                };
                let retry = () => __awaiter(this, void 0, void 0, function* () {
                    yield setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        resolve(yield this.getData());
                    }), 100);
                });
                const httpRequest = http_1.request(requestOptions, (response) => {
                    let retData = "";
                    response.on('data', (data) => {
                        retData = retData + data;
                    });
                    response.on('end', () => {
                        resolve(JSON.parse(retData));
                    });
                }).on('error', yield retry).end();
            }));
        });
    }
}
exports.Observer = Observer;
