"use strict";
exports.__esModule = true;
var Subject = /** @class */ (function () {
    function Subject() {
        this.observers = [];
        this.filters = [];
    }
    Subject.prototype.addFilter = function (filter) {
        this.filters.push(filter);
    };
    Subject.prototype.register = function (observer) {
        this.observers.push(observer);
    };
    Subject.prototype.notifyAll = function (input) {
        this.observers.forEach(function (observer) {
            observer.notify(input);
        });
    };
    Subject.prototype.makeRow = function () {
        var input = "";
        this.filters.forEach(function (filter) {
            input = filter.generate(input);
        });
        this.notifyAll(input.slice(0, input.length - 1));
    };
    return Subject;
}());
exports.Subject = Subject;
