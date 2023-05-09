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

let reArr = [9, 8, 7];
reArr.reverse();
console.log(reArr); //[ 7, 8, 9 ]

let sortArr = [5, 19, 13, 18, 12];
sortArr.sort(function (a, b) {
  return a - b; // 按照升序的方式
});
console.log(sortArr); //[ 5, 12, 13, 18, 19 ]

//从前面开始查找
let indexOfArr = [78, 98, 635, 12, 54, 58, 68, 58];
console.log(indexOfArr.indexOf(58)); //5 只返回第一个满足条件的索引号
console.log(indexOfArr.indexOf(528)); // -1

//从后面开始查找
let lastIndefOfArr = [1, 5, 8, 6, 78, 5, 87, 1, 1, 1];
console.log(lastIndefOfArr.lastIndexOf(1)); //9 只返回最后一个满足条件的索引号
console.log(lastIndefOfArr.lastIndexOf(158)); //-1

//数组去重
/* 
目标︰把旧数组里面不重复的元素选取出来放到新数组中，重复的元素只保留一个，放到新数组中去重。
核心算法︰我们遍历旧数组，然后拿着旧数组元素去查询新数组，如果该元素在新数组里面没有出现过，我们就添加，否则不添加。
*/
let repetitiveStringArr = [
  "a",
  "b",
  "y",
  "a",
  "a",
  "u",
  "a",
  "a",
  "i",
  "n",
  "a",
  "f",
  "g",
];

function uniqueArr(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    console.log(newArr.indexOf(arr[i]) === -1, arr[i]);
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
let demo = uniqueArr(repetitiveStringArr);
console.log(demo); //['a', 'b', 'y','u', 'i', 'n','f', 'g']

let stringArr = ["s", "t", "r"];
console.log(stringArr.toString()); //s,t,r
console.log(stringArr.join("*")); //s*t*r

let str59 = "andy";
console.log(str59.length); //4
//为什么简单类型会有属性呢

//基本包装类型：就是把简单数据类型包装成为了复杂数据类型,步骤如下：
//1.把简单数据类型包装为复杂数据类型
let temp = new String("andy");
//2.把临时变量的值给str
str59 = temp;
//3.销毁临时变量temp
temp = null;

//字符串的不可变性
let str758 = "pinnk";
console.log(str758);
str758 = "red";
console.log(str758);
//虽然值变了，但是开辟了新的内存空间，因此不要大量的拼接字符串

/* let str800 = "";
for (let i = 1; i < 1000000; i++) {
  str800 += i;
}
console.log(str800);//会特别卡 */

let str810 = "sdhajsdhjasdhajk";
console.log(str810.indexOf("a")); //3
console.log(str810.indexOf("a", 5)); //9 (包括有一个可选参数，确定查找的位置)

//查找字符串中'adasdasmoasdasdowqodoasdqwo'所以有 o 出现的位置及次数
/* 
1.核心算法︰先查找第一个o出现的位置
2.然后只要indexOf返回的结果不是-1就继续往后查找
3.因为indexOf只能查找到第一个，所以后面的查找，利用第二个参数，当前索引加1，从而继续查找
*/
let str1936 = "adasdasmoasdasdowqodoasdqw";
let index1936 = str1936.indexOf("o");
let num1941 = 0;
while (index1936 !== -1) {
  num1941++;
  index1936 = str1936.indexOf("o", index1936 + 1);
}
console.log(index1936, num1941); // -1 5

// 1.charAt 根据位置返回字符
console.log(str1936.charAt(3)); //s
// 遍历所有的字符
for (let i = 0; i < str1936.length; i++) {
  console.log(str1936.charAt(i));
}
// 2.charCodeAt(index) 返回相应索引号的字符ACSII码 判断用户按下了哪个键
console.log(str1936.charCodeAt(8)); //111
//3. str[index]
console.log(str1936[3]); //s

let obj004 = {
  age: 18,
};
if (obj004["age"]) {
  console.log("包含该属性");
} else {
  console.log("没有该属性");
}

//判断一个字符串'abcoefoxyozzopp'中出现次数最多的字符，并统计其次数。
/* 
核心算法:利用charAt(）遍历这个字符串
把每个字符都存储给对象，如果对象没有该属性，就为1，如果存在了就+1
遍历对象，得到最大值和该字符
*/
let str009 = "abcoefoxyozzopp";
let obj009 = {};
for (let i = 0; i < str009.length; i++) {
  let chars = str009.charAt(i);
  if (obj009[chars]) {
    obj009[chars]++;
  } else {
    obj009[chars] = 1;
  }
}
console.log(obj009); //{ a: 1, b: 1, c: 1, o: 4, e: 1, f: 1, x: 1, y: 1, z: 2, p: 2 }
let max016 = 0;
let char018 = "";
for (let k in obj009) {
  if (obj009[k] > max016) {
    max016 = obj009[k];
    char018 = k;
  }
}
console.log("出现次数最多的字符是：" + char018, "，共：" + max016); // 出现次数最多的字符是：o ，共：4

//concat()方法用于连接两个或多个字符串。拼接字符串，等效于+，+更常用
let str0341 = "andy";
console.log(str0341.concat("-hello")); //andy-hello

//substr('截取的起始位置','截取几个字符')
let str036 = "改革春风满地";
console.log(str036.substr(2, 2)); //春风

//替换字符串 replace('被替换的字符','替换为字符') 只会替换第一个字符
let str039 = "andya";
console.log(str039.replace("a", "b")); //bndya
// 有一个字符串'sdasdqwwedsfcdsgdfsg'把里面的所有s换为*
let str045 = "sdasdqwwedsfcdsgdfsg";
while (str045.indexOf("s") !== -1) {
  str045 = str045.replace("s", "*");
}
console.log(str045); //*da*dqwwed*fcd*gdf*g

// 字符串转为数组 split('分隔符') 前面我们学过join把数组转换为字符串
let str051 = "red,pink,blue";
console.log(str051.split(",")); //[ 'red', 'pink', 'blue' ]
