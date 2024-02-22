const vanilla = {
  username: 'none',
};

const d = {
  ...vanilla,
  username: 'hi',
};

const tst = {
  username: 'one',
  username: 'one',
};

console.log(d, tst);
