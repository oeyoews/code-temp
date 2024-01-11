// 第一个参数是指定原型对象
const d = Object.create({ age: 9 });

const person = {
  name: 'Linux',
  age: 10,
};

// 原型继承：基于一个已经存在的对象创建对象
const linux = Object.create(person, {
	// name 会覆盖前者的 name, 都是在原型对象上
  name: {
    value: 'Manjaro',
    enumerable: true,
    writable: true,
  },
});
console.log(linux.name);

// add count field on d object prototype
Object.defineProperty(d, 'count', {
  value: 99,
});

d.a = 11;

const obj = {};

console.log(obj.__proto__);
// 修改 obj 的原型
Object.setPrototypeOf(obj, {
  age: 999,
});

console.log('obj:', obj.__proto__);
// 但是建议使用 Object.getPropertypeOf 获取原型，不是 __proto__
console.log(Object.getPrototypeOf(obj));

console.log(d.count);
console.log(d.__proto__); // { age: 9 }
console.log(d.hasOwnProperty('age'));
console.log(d.hasOwnProperty('a'));
