console.log(Math.PI); //3.141592653589793

console.log(Math.max(1, 2, 6, 5)); //6

console.log(Math.abs(1)); //1
console.log(Math.abs(-1)); //1
console.log(Math.abs("-1")); //1 隐式转换
console.log(Math.abs("number")); //NaN

//三个取整方法
console.log(Math.floor(1.1)); //1 向下取整
console.log(Math.ceil(1.1)); //2 向上取整
console.log(Math.round(1.5)); //2 四舍五入
console.log(Math.round(-1.5)); //-1 四舍五入 其他数字都是四舍五入但是.5特殊它往大了取

//Math.random()
/* 
Math对象随机数方法random()返回一个随机的小数0 =<x <1
这个方法里面不跟参数
*/
console.log(Math.random()); //0.8577023374955108 Math.floor (Math.random()(max - min + 1))+ min;
// 我们想要得到两个数之间的随机整数并且包含这2个整数
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(getRandom(1, 10)); //9

// `Date() 日期对象`是一个构造函数必须使用new来调用创建我们的日期对象
let date = new Date();
console.log(date); //2023-03-28T10:52:19.981Z
/* 
1.如果没有参数返回当前系统的当前时间
2.参数常用的写法 
  数字型 2019,10,01 或者字符串型 2019-10-1 8:8:8
*/
let date2 = new Date(2023, 3, 28);
console.log(date2); //2023-04-27T16:00:00.000Z
let date3 = new Date("2023-3-28 18:58");
console.log(date3); //2023-03-28T10:58:00.000Z

console.log(new Date().getFullYear()); //2023
console.log(new Date().getMonth()); //2 返回的月份需要加1
console.log(new Date().getDate()); //28
console.log(new Date().getDay()); //2 星期几 周日为0
console.log(new Date().getHours()); //时 19
console.log(new Date().getMinutes()); //分 20
console.log(new Date().getSeconds()); //秒 4

console.log(
  "现在是" +
    new Date().getFullYear() +
    "年" +
    `${new Date().getMonth() + 1}` +
    "月" +
    new Date().getDate() +
    "日" +
    "星期" +
    `${new Date().getDay() === 0 ? "天" : new Date().getDay()}` +
    new Date().getHours() +
    " " +
    "时" +
    new Date().getMinutes() +
    "分" +
    new Date().getSeconds() +
    "秒"
); //现在是2023年3月28日星期2 19时23分32秒

//获取时间秒/时间戳
let now = new Date();
console.log(now.valueOf()); //1680002943153
console.log(now.getTime()); //1680002964760
let now1 = +new Date();
console.log(now1); //1680003021052
//h5 新增的获得总的毫秒数
console.log(Date.now()); //1680003087320

//倒计时
function countDown(time) {
  let nowTime = +new Date(); //当前时间毫秒数
  let inputTime = +new Date(time); //用户输入毫秒数
  let tims = (inputTime - nowTime) / 1000; //剩余时间毫秒
  let day = parseInt(tims / 60 / 60 / 24);
  let hour = parseInt((tims / 60 / 60) % 24);
  let m = parseInt((tims / 60) % 24);
  let s = parseInt(tims % 60);
  return day + "天" + hour + "时" + m + "分" + s + "秒";
}
console.log(
  "现在是" +
    new Date().getFullYear() +
    "年" +
    `${new Date().getMonth() + 1}` +
    "月" +
    new Date().getDate() +
    "日" +
    "星期" +
    `${new Date().getDay() === 0 ? "天" : new Date().getDay()}` +
    new Date().getHours() +
    " " +
    "时" +
    new Date().getMinutes() +
    "分" +
    new Date().getSeconds() +
    "秒"
);
console.log("距离倒计时还有：", countDown("2023-3-28 19:50:00")); //0天0时2分33秒

//创建数组的两种方式
//1. 利用数组的字面量
let arr = [1, 2, 3];
console.log(arr[2]); //3
//2. 利用new Array()
let arr1 = new Array(2); //创建一个长度为2的数组，里面有两个空元素。
console.log(arr1); //[ <2 empty items> ]
let arr2 = new Array(2, 3);
console.log(arr2); //[ 2, 3 ] 等价于创建[2,3]

//检测是否为数组
//1. instanceof 运算符
let arrIns = [];
let arr1Ins = {};
console.log(arrIns instanceof Array); //true
console.log(arr1Ins instanceof Array); //false

//2. Array.isArray()
console.log(Array.isArray(arrIns)); //true
console.log(Array.isArray(arr1Ins)); //false

//数组元素添加删除元素

//1.push() 在我们的数组末尾添加一个或多个元素
let arrPush = [1, 2, 3];
arrPush.push(4, "blue");
console.log(arrPush.push(5, "pink")); //7
console.log(arrPush); // [ 1, 2, 3, 4, 'blue' , 5, 'pink']
/* 
1. push()可以给数组追加新的元素 
2. push()参数直接写数组元素就可以了
3. push()完毕后返回的结果是新数组的长度
4. push()完毕后原数组也会发生变化
*/

//2. unshift() 在我们数组的开头添加一个或多个元素
let arrUnshift = [1, 2, 3];
arrUnshift.unshift("loop", "pop");
console.log(arrUnshift); //[ 'loop', 'pop', 1, 2, 3 ]
/* 
1. unshift()可以给数组前面追加新的元素 
2. unshift()参数直接写数组元素就可以了
3. unshift()完毕后返回的结果是新数组的长度
4. unshift()完毕后原数组也会发生变化
*/

//3. pop() 删除数组的最后一个元素
let arrPop = [1, 2, 3];
arrPop.pop();
console.log(arrPop); //[ 1, 2 ]
console.log(arrPop.pop()); //2
/* 
1. pop()可以删除数组的最后一个元素记住一次只能删除一个元素
2. pop()没有参数
3. pop()完毕后返回的结果是删除的那个元素
4. pop()完毕后原数组也会发生变化
*/

//4. shift() 删除数组的第一一个元素
let arrShift = [1, 2, 3];
arrShift.shift();
console.log(arrShift); //[ 2, 3 ]
console.log(arrPop.shift()); //1
/* 
1. shift()可以删除数组的第一个元素记住一次只能删除一个元素
2. shift()没有参数
3. shift()完毕后返回的结果是删除的那个元素
4. shift()完毕后原数组也会发生变化
*/