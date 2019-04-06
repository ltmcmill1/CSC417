'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const Subject_1 = require("./Subject");
const RNG_1 = require("./RNG");
const Observer_1 = require("./Observer");
let sub = new Subject_1.Subject();
sub.addFilter(new RNG_1.RNG("pomposity", 0, 100));
sub.addFilter(new RNG_1.RNG("learning_curve", 1, 100));
sub.addFilter(new RNG_1.RNG("optimism", 0.1, 100));
sub.addFilter(new RNG_1.RNG("atleast", 0, 10));
sub.addFilter(new RNG_1.RNG("done_percent", 0, 10));
sub.addFilter(new RNG_1.RNG("productivity_new", 0, 1));
sub.addFilter(new RNG_1.RNG("productivity_exp", 1, 10));
sub.addFilter(new RNG_1.RNG("d", 0, 1));
sub.addFilter(new RNG_1.RNG("ep", 1, 10));
sub.addFilter(new RNG_1.RNG("nprod", 0.1, 10));
sub.addFilter(new RNG_1.RNG("np", 1, 30));
sub.addFilter(new RNG_1.RNG("ts", 1, 100));
sub.addFilter(new RNG_1.RNG("to", 1, 100));
sub.addFilter(new RNG_1.RNG("r", 1, 1000));
let obs = new Observer_1.Observer(sub);
let iterations = 1;
let verbose = 'False';
if (process.argv[2] === "-n") {
    iterations = parseInt(process.argv[3]);
    if (process.argv[4] === "-v") {
        verbose = process.argv[5];
    }
}
if (process.argv[4] === "-n") {
    iterations = parseInt(process.argv[5]);
    if (process.argv[2] === "-v") {
        verbose = process.argv[3];
    }
}
function makeNewRow(i, end) {
    sub.makeRow(verbose).then(() => {
        if (i < end) {
            makeNewRow(i + 1, end);
        }
    });
}
makeNewRow(1, iterations);
