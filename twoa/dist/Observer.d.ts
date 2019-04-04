import { Subject } from "./Subject";
declare class Observer {
    subject: Subject;
    constructor(subject: Subject);
    notify(): void;
}
export { Observer };
