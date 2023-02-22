// console.log(num); // 报错 num is not defined
console.log(num); // undefined
var num = 10;
/* 
    先进行预解析，后执行代码。相当于执行以下代码：
    var num;
    console.log(num);// undefined
    num = 10;
*/

fn(); //11
function fn() {
  console.log(11);
}
fn(); // 11
// 函数表达式2调用必须写在函数表达式的下面

// fun(); // fun is not a function
var fun = function () {
  console.log(22);
};
fun(); //22
/* 
    先进行预解析，后执行代码。相当于执行以下代码：
    var fun;
    fun();
    fun = function () {
     console.log(22);
    };
*/

//1. 我们的js引擎运行分为两步： 预解析 代码执行
//2. 预解析：js会把js里所有的变量与函数声明定义提升到当前作用域的最前面
//3. 代码执行： 按照代码书写的顺序从上往下执行
//4. 预解析分为：变量预解析（变量提升） 和 函数预解析（函数提升）
//5. 变量提升： 就是把所有变量声明提升到当前作用域的最前面 不提升赋值操作
//6. 函数提升： 就是把所有函数声明提升到当前作用域最前面 不调用函数

var num = 10;
fun1(); // undefined
function fun() {
  console.log(num);
  var num = 20;
}
// 相当于执行以下代码

var num;
function fun() {
  var num;
  console.log(num);
  num = 20;
}
num = 10;
fun();

var num = 10;
function fn() {
  console.log(num);
  var num = 20;
  console.log(num);
}
fn(); // undefined 20
// 相当于以下代码

var num;
function fn() {
  var num;
  console.log(num);
  num = 20;
  console.log(num);
}
num = 10;
fn();

var a = 18;
f1();

function fun() {
  var b = 9;
  console.log(a);
  console.log(b);
  var a = "123";
}
// 相当于以下代码
var a;
function f1() {
  var b;
  var a;
  b = 9;
  console.log(a);
  console.log(b);
  a = "123";
}
a = 18;
f1(); // undefined 9

f1();
console.log(c);
console.log(b);
console.log(a);
function f1() {
  var a = b = c = 9;
  console.log(a);
  console.log(b);
  console.log(c);
}
// 相当于以下代码
function f1() {
  var a = b = c = 9;
  // 相当于 var a = 9; b = 9; c = 9;  b和c直接赋值，没有声明 当 全局变量看
  // 集体声明 var a = 9,b = 9,c =9 ;
  console.log(a);//9
  console.log(b);//9
  console.log(c);//9
}
f1();
console.log(c);//9
console.log(b);//9
console.log(a);//undefined