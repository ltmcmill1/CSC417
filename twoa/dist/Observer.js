"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Observer {
    constructor(subject) {
        this.subject = subject;
        this.subject = subject;
        this.subject.register(this);
    }
    notify(input) {
        // Get the info from the API
        // Write that shit out
        console.log(input);
    }
}
exports.Observer = Observer;
