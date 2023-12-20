function hi() {
  let n = 1;

  return function () {
    n++;
    console.log(n);
  };
}

hi()();
hi()();
