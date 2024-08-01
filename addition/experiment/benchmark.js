const time1 = new Date();

class Sequence {
  constructor(from, to, filterArr) {
    this.from = from;
    this.to = to;
    this.filter_arr = [...filterArr];
  }

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  }

  get array() {
    return Array.from(new Sequence(this.from, this.to, this.filter_arr));
  }

  findNextEl(num) {
    if (this.filter_arr.length && this.filter_arr.find(i => num % i === 0)) {
      return this.findNextEl(num + 1);
    }
    return num;
  }

  next() {
    if (this.current <= this.to) {
      this.current = this.findNextEl(this.current);

      if (this.current > this.to) {
        return { done: true };
      }

      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  }
}

let range_arr = new Sequence(1, 100000, []).array;

const time2 = new Date();

console.log(range_arr);

const res1 = time2 - time1;
console.log(res1);

const time3 = new Date();

let range_arr2 = [];

for (let i = 1; i <= 100000; i++) {
  range_arr2.push(i);
}

const time4 = new Date();

console.log(range_arr2);
const res2 = time4 - time3;
console.log(res2);

const time5 = new Date();

let range_arr3 = [];

for (let i = 1; i <= 100000; i++) {
  range_arr3 = [...range_arr3, i];
}

const time6 = new Date();

console.log(range_arr3);
const res3 = time6 - time5;
console.log(res3);
