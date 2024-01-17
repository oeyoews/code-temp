class Person {
  constructor() {
    console.log('s');
  }

  s() {
    console.log('hi');
  }

  static sayHi() {
    console.log('hi');
  }
}

class Son extends Person {
  #nam = 99;
  count = 9;
  constructor(params) {
    super();
    // console.log(super.s);
    // console.log('hi');
    console.log(this.#nam, this.count);
  }
  sayHi(x, y) {
    console.log(x, y);
  }
  sayhi(x) {
    console.log(x);
  }
}

new Son().sayHi('888');
