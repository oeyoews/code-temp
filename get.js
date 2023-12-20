const obj1 = {
  name: "Alice",
  age: 18,
  hobbies: ["reading", "dancing"],
  address: {
    city: "Shanghai",
    street: "Nanjing Road",
  },
};

const obj2 = Object.assign({}, obj1);

obj1.hobbies = 98;
console.log(obj1, obj2.hobbies);
