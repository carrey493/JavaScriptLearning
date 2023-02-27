// 1.利用对象字面量创建对象
let obj = {};
let obj1 = {
  uname: "zhangsan",
  age: 18,
  sex: "男",
  sayHi: function () {
    console.log("你好");
  },
};
/* 
1. 对象里面的属性或者方法采用键值对的形式 键 属性名 ： 值 属性值
2. 多个属性或者方法中间有逗号隔开
3. 方法冒号后面是一个匿名函数
*/

// 2.使用对象
/* 
1. 调用对象的属性 我们采用 对象名.属性名
2. 另一种使用方式 对象名['属性名']
3. 调用对象的方法 对象名.方法名()
*/
console.log(obj1.age); // 18
console.log(obj1["uname"]); //zhangsan
obj1.sayHi(); // 你好
