const log = (fn) => {
  const fns = (a, b) => {
    const res = fn(a, b);
    console.log(res);
    return res;
  };
  return fns;
};

const add = (a, b) => {
  return a + b;
};

const d = log(add);
d(1, 2);
