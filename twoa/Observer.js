"use strict";
exports.__esModule = true;
var Observer = /** @class */ (function () {
    function Observer(subject) {
        this.subject = subject;
        this.subject = subject;
        this.subject.register(this);
    }
    Observer.prototype.notify = function (input) {
        // Get the info from the API
        // Write that shit out
        console.log(input);
    };
    return Observer;
}());
exports.Observer = Observer;
