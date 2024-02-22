function async1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //   console.log('async');
      return resolve('ok');
    }, 1000);
  });
}

async function main() {
  const res = await async1();
  console.log(res);
  console.log('01');
}

function m1() {
  return async1()
    .then((res) => console.log(res))
    .then(() => console.log('01'));
}

main();
m1();
