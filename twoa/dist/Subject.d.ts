import { RNG } from "./RNG";
import { Observer } from "./Observer";
declare class Subject {
    observers: Observer[];
    filters: RNG[];
    constructor();
    addFilter(filter: RNG): void;
    register(observer: Observer): void;
    notifyAll(input: string): void;
    makeRow(): void;
}
export { Subject };
