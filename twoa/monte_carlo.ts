'use strict';

import { Subject } from "./Subject";
import { RNG } from "./RNG";
import { Observer } from "./Observer";

let sub = new Subject();
sub.addFilter(new RNG("pomposity",0,100));
sub.addFilter(new RNG("learning_curve",1,100));
sub.addFilter(new RNG("optimism",0.1,100));
sub.addFilter(new RNG("atleast",0,10));
sub.addFilter(new RNG("done_percent",0,10));
sub.addFilter(new RNG("productivity_new",0,1));
sub.addFilter(new RNG("productivity_exp",1,10));
sub.addFilter(new RNG("d",0,1));
sub.addFilter(new RNG("ep",1,10));
sub.addFilter(new RNG("nprod",0.1,10));
sub.addFilter(new RNG("np",1,30));
sub.addFilter(new RNG("ts",1,100));
sub.addFilter(new RNG("to",1,100));
sub.addFilter(new RNG("r",1,1000));

let obs = new Observer(sub);

let iterations = 1;
if (process.argv[2] === "-n" || process.argv[2] === "--num-repeats") {
  iterations = parseInt(process.argv[3]);
}

for (let i = 0; i < iterations; i++) {
  sub.makeRow();
}