type IPromise = Promise<{
  name: string;
  desc: string;
}>;

const promiseTest = (): IPromise => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'promise',
        desc: 'promise test with ts infer',
      });
    }, 1000);
  });
};

type IPromiseRes = Awaited<IPromise>;

type IPromiseLike<T extends PromiseLike<any>> = Awaited<T>;

async function main() {
  const res: IPromiseRes = await promiseTest();
  console.log(res);
}

main();
