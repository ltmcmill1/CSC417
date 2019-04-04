"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const buffer_1 = require("buffer");
class Subject {
    constructor() {
        this.observers = [];
        this.filters = [];
    }
    addFilter(filter) {
        this.filters.push(filter);
    }
    register(observer) {
        this.observers.push(observer);
    }
    notifyAll() {
        this.observers.forEach(function (observer) {
            observer.notify();
        });
    }
    makeRow() {
        let input = "";
        this.filters.forEach(function (filter) {
            input = filter.generate(input);
        });
        let body = input.slice(0, input.length - 1);
        let requestOptions = {
            hostname: 'localhost',
            port: 3001,
            path: '/data',
            method: 'POST',
            headers: {
                'Connection': 'Keep-Alive',
                'Content-Length': buffer_1.Buffer.byteLength(body),
                'Content-Type': 'text/plain'
            }
        };
        const httpRequest = http_1.request(requestOptions, (response) => {
            console.log("Ended");
            this.notifyAll();
        });
        httpRequest.write(JSON.stringify(body));
        httpRequest.end();
    }
}
exports.Subject = Subject;
