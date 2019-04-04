declare class RNG {
    name: string;
    min: number;
    max: number;
    constructor(name: string, min: number, max: number);
    generate(input: string): string;
}
export { RNG };
