// 突破点：原型
const o = (function () {
  const obj = {
    a: 1,
    b: 2,
  };
  // 漏洞修复 01: //   Object.setPrototypeOf(obj, null);
  return {
    get: function (a) {
      // 漏洞修复 02: if (!obj.hasOwnProperty(a)) return undefined;
      return obj[a];
    },
  };
})();

Object.defineProperty(Object.prototype, 'abc', {
  // getter
  get() {
    return this;
  },
});

// get this
const a = o.get('abc');
// 侵入：修改 b
a.b = 22;
console.log(o.get('b'));
