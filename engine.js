// 构造函数
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// 原型方法
Person.prototype.introduce = function() {
    console.log("我叫" + this.name + "，今年" + this.age + "岁。");
};

// 示例用法
const person1 = new Person("张三", 25);
person1.introduce();

person1.