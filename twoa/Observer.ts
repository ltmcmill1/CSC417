import { Subject } from "./Subject";

class Observer {
  constructor(public subject: Subject) {
    this.subject = subject;
    this.subject.register(this);
  }
  
  
  notify(input:string) {
    // Get the info from the API
    // Write that shit out
    console.log(input);
  }
}

export { Observer };