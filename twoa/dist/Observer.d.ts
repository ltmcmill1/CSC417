import { Subject } from "./Subject";
declare class Observer {
    subject: Subject;
    constructor(subject: Subject);
    notify(input: string): void;
}
export { Observer };
