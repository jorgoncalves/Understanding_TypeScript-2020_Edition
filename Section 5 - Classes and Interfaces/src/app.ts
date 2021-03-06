// type addFn = (a: number, b: number) => number;
interface addFn {
  (a: number, b: number): void;
}

let add: addFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  readonly name?: string;
  outputName?: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name?: string;
  constructor(n?: string) {
    if (n) this.name = n;
  }
  greet(phrase: string) {
    if (this.name) console.log(phrase + this.name);
    else console.log('Hi!');
  }
}

let user1: Greetable;

user1 = new Person();

user1.greet('Hello, I am ');
