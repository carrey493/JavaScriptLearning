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

// 变量、属性、函数、方法的区别

// 变量和属性的相同：都是用来存储数据的

let name2 = "ls";
let obj2 = {
  name: "zs",
};

// 变量：单独声明并赋值，使用的时候直接写变量名，单独存在。
// 属性：在对象里面，不需要声明，使用时需要 对象.属性

// 函数和方法的相同点 都是实现某种功能：做某件事

// 函数是单独声明并且调用的 函数名() 单独存在的
// 方法在对象里面，调用的时候 对象.方法()

//利用new Object创建对象
let obj3 = new Object();
obj3.uname = "章安奉";
obj3.age = 25;
obj3.sex = "male";
obj3.sayHi = function () {
  console.log("hi");
};
// 1.利用等号赋值的方法 添加对象的属性和方法
// 2.每个属性和方法之间用分号结束
console.log(obj3.uname);
console.log(obj3.sayHi());

// 为什么需要使用构造函数？==》就是因为之前两种创建对象的方式只能一次创建一个对象

let user1 = {
  name: "qq1",
};
let user2 = {
  name: "qq2",
};
let user3 = {
  name: "qq3",
};

// 构造函数的语法格式
/* 
function 构造函数名(){
  this.属性 = 值
  this.方法 = function(){}
}
new 构造函数名();
*/
function Star(uname, age, sex) {
  this.uname = uname
  this.age = age
  this.sex = sex
  this.sing = function(sang){
    console.log(sang);
  }
}
let ldh = new Star("ldh", 188, "nan");//调用函数返回的是一个对象
console.log(ldh.age);
ldh.sing('冰雨')
let zxy = new Star("zxy", 125, "nan");//调用函数返回的是一个对象
// 1. 构造函数名字首字母要大写
// 2. 构造函数不需要return 就可以返回结果
// 3. 我们调用构造函数时必须使用new
// 4. 我们只要 new Star() 就调用函数生成一个对象
// 5. 我们的属性和方法前面必须添加 this