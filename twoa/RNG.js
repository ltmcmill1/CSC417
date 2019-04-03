"use strict";
exports.__esModule = true;
var RNG = /** @class */ (function () {
    function RNG(name, min, max) {
        this.name = name;
        this.min = min;
        this.max = max;
        this.name = name;
        this.min = min;
        this.max = max;
    }
    RNG.prototype.generate = function (input) {
        return input + (Math.random() * (this.max - this.min) + this.min).toFixed(2) + ",";
    };
    return RNG;
}());
exports.RNG = RNG;
