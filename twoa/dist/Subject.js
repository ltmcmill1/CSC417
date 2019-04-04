"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    notifyAll(input) {
        this.observers.forEach(function (observer) {
            observer.notify(input);
        });
    }
    makeRow() {
        let input = "";
        this.filters.forEach(function (filter) {
            input = filter.generate(input);
        });
        this.notifyAll(input.slice(0, input.length - 1));
    }
}
exports.Subject = Subject;
