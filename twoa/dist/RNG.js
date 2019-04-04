"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RNG {
    constructor(name, min, max) {
        this.name = name;
        this.min = min;
        this.max = max;
        this.name = name;
        this.min = min;
        this.max = max;
    }
    generate(input) {
        return input + (Math.random() * (this.max - this.min) + this.min).toFixed(2) + ",";
    }
}
exports.RNG = RNG;
