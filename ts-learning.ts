// 并集
type I1 = 'one';
type I2 = 'two';
type I3 = I1 | I2; // 'one' | 'two'

// 交集
type A1 = 'a';
type A2 = 'b';
type A3 = A1 & A2; // never

enum T {
  A = 1,
  B,
  C,
  D,
}

const demo = T.A;
console.log(demo);
