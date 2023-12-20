// 虚构数组
const data = Array.from({ length: 10 }, (_, i) => i + 1);

const d1 = [1, 2, 3];
const d2 = [
  {
    id: 1,
    name: 'John',
  },
  {
    id: 2,
    name: 'Jane',
  },
];
const data1 = Array.from(d1, (arr) => arr * 2);
const data2 = Array.from(d2, (obj) => obj.name);
console.log(data, data1, data2);

// data:  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// data1: [2, 4, 6]
// data2: [('John', 'Jane')]
