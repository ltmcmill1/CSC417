class RNG {
  constructor(public name: string, public min: number, public max: number) {
    this.name = name;
    this.min = min;
    this.max = max;
  }
  
  generate(input:string) {
    return input + "\'" + this.name + "\': " + (Math.random()*(this.max-this.min)+this.min).toFixed(2) + ", ";
  }
}

export { RNG };