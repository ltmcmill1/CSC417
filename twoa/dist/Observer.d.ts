import { Subject } from "./Subject";
declare class Observer {
    subject: Subject;
    private httpAgent;
    constructor(subject: Subject);
    notify(): Promise<{}>;
    private getData;
}
export { Observer };
