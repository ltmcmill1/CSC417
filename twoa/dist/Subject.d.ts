import { RNG } from "./RNG";
import { Observer } from "./Observer";
declare class Subject {
    private observers;
    private filters;
    private httpAgent;
    constructor();
    addFilter(filter: RNG): void;
    register(observer: Observer): void;
    notifyAll(): Promise<void>;
    makeRow(verbose: string): Promise<void>;
    private postData;
}
export { Subject };
