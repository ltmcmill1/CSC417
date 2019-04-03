import { RNG } from "./RNG";
import { Observer } from "./Observer";

class Subject {
  observers: Observer[];
  filters: RNG[];
  
  constructor() {
    this.observers = [];
    this.filters = [];
  }
  
  addFilter(filter: RNG) {
    this.filters.push(filter);
  }
  
  register(observer: Observer) {
    this.observers.push(observer);
  }
  
  notifyAll(input:string) {
    this.observers.forEach(function (observer) {
      observer.notify(input);
    });
  }
  
  makeRow() {
    let input = "";
    this.filters.forEach(function (filter) {
      input = filter.generate(input);
    });
    this.notifyAll(input.slice(0,input.length-1));
  }
  
}

export { Subject };