const d = {
  name: 'd',
  age: 18,
};

// const dclone = Object.assign(d, { name: 99 });
const dclone2 = Object.assign({}, d, { name: 98 });
console.log(dclone2, d);

const d3 = {
  name: '99',
  age: {
    n: '999',
  },
};

console.log(d3);

const d4 = d3;

// d4.age = '9';
d4.age.n = '999999';

console.log(d4, d3);

let ingredients_list = ['noodles', { list: ['eggs', 'flour', 'water'] }];

let ingredients_list_copy = Array.from(ingredients_list);
// ingredients_list_copy[1].list = '999';
// ingredients_list_copy[1].list[0] = '999';
ingredients_list_copy.push('one');
console.log(JSON.stringify(ingredients_list));
// ["noodles",{"list":["eggs","flour","water"]}]
