const obj = { a: 1, b: 2, c: 3 };

const arr = Object.entries(obj).map(([key, value]) => ({ key, value }));

console.log(arr);
