'use strict';
exports.__esModule = true;
var Subject_1 = require("./Subject");
var RNG_1 = require("./RNG");
var Observer_1 = require("./Observer");
var sub = new Subject_1.Subject();
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
var obs = new Observer_1.Observer(sub);
var iterations = 1;
if (process.argv[2] === "-n" || process.argv[2] === "--num-repeats") {
    iterations = parseInt(process.argv[3]);
}
for (var i = 0; i < iterations; i++) {
    sub.makeRow();
}
