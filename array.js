const randomChar = () => {
  return Math.random().toString(36).slice(-8);
};

const demo = randomChar();
console.log(demo);
