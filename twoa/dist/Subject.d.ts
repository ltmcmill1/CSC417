import { RNG } from "./RNG";
import { Observer } from "./Observer";
declare class Subject {
    private observers;
    private filters;
    constructor();
    addFilter(filter: RNG): void;
    register(observer: Observer): void;
    notifyAll(): void;
    makeRow(): void;
}
export { Subject };
