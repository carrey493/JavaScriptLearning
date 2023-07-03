// 简单数据类型 null 返回的是一个空对象 obbject
let timer = null;
console.log(typeof timer); //object

//如果有个变量我们以后打算存储为对象 暂时没想好放啥 这个时候就给null

//1.简单数据类型 是存放在栈里面 里面直接开辟一个空间存放的是值

//2.复杂数据类型 首先在栈里面存放地址 十六进制表示 然后指向堆里面的数据

function fn(a) {
  a++;
  console.log(a);
}

var x = 10;
fn(x);
console.log(x); // 11 10

function Person(name) {
  this.name = name;
}

function f1(x) {
  console.log(x.name); //ldh
  x.name = "zxy";
  console.log(x.name); //zxy
}
var p = new Person("ldh");
console.log(p.name); //ldh
f1(p);
console.log(p.name);//zxy
