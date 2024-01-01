// 案例 求数组的累加和
// 1-100 10-50
let sum1111 = 0
for (let i = 1; i <= 100; i++) {
    sum1111 += i
}
console.log(sum1111);//5050

let sum1112 = 0
for (let i = 10; i <= 50; i++) {
    sum1112 += i
}
console.log(sum1112);//1230

//函数方法
function getSum(num1, num2) {
    let sum = 0
    for (let i = num1; i <= num2; i++) {
        sum += i
    }
    console.log(sum);
}
getSum(1, 100)//5050
getSum(10, 50)//1230

//1.声明函数
/* 
function 函数名 () {
    //函数体
}
 */
function sayHi() {
    console.log('hi~~~~');
}
// function() 声明函数的关键字 全部小写
//函数是做某件事情，函数名一般是小写
//函数不调用，自己不执行。

//2.调用函数
// 函数名()
sayHi()
//调用函数时千万不要忘记加小括号

//案例:利用函数计算1-100之间的累加和
function getSum() {
    let sum = 0;
    for (let i = 1; i <= 100; i++) {
        sum += i
    }
    console.log(sum);
}
getSum()//5050
getSum()//5050

/* 
1.函数是做什么的(作用)?
2声明函数用什么关键词?
3.如何调用函数?
4.封装是什么意思?
*/

//函数的参数

/* function 函数名(形参1,形参2...) { //在声明函数小括号里是形参 (形式上的参数)

}

函数名(实参1,实参2...) //在函数调用的小括号里是实参(实际的参数)
 */

//形参和实参的执行过程
function cook(aru) {//形参是接收实参的 ary='酸辣土豆丝' 形参类似于变量
    console.log(aru);
}
cook('酸辣土豆丝')
cook('番茄鸡蛋')

// 函数的参数可以有也可以没有 个数不限

//利用函数求任意两数的和
function getSum2(a, b) {
    console.log(a + b);
    return a + b
}
getSum2(105, 205)//310

//利用函数求任意两数之间的和
function getSum3(n1, n2) {
    let sum = 0;
    for (let i = n1; i <= n2; i++) {
        sum += i
    }
    console.log(sum);
}
getSum3(1, 100)//5050
getSum3(1, 10)//55

//一个参数与另一个参数之间用,隔开
//形参可以看作不用声明的变量

function getSum4(a, b) {
    console.log(a + b);
    return a + b
}

//如果实参的个数和形参的个数一致则正常输出结果
getSum4(1, 2)//3

//如果实参的个数多于形参的个数，会取到形参的个数
getSum4(1, 2, 3)//3

//形参可以看做是不用声明的变量num2是一个变量但是没有接受值结果就是undefined

getSum4(1)//NaN

//函数的返回值格式
/* 
function 函数名(){
    return 需要返回的结果
}
函数名()
*/
//我们函数只是实现某种功能，最终的结果需要返回给函数的调用者 函数名() 通过return实现的
//只要函数遇到return 就把后面的结果返回给函数的调用者 函数名() = return 后面的接过

function getResult() {
    return 'getResult'
}

console.log(getResult());//getResult

function cook(arg) {
    return arg;
}
console.log(cook('蔬菜'));///蔬菜

//利用函数 求两个数的最大值
function getMax(n1, n2) {
    // if (n1 > n2) { return n1 } else return n2
    return n1 > n2 ? n1 : n2
}
console.log(getMax(11, 3));//11

//利用函数求数组中的最大值
function getArrMax(arr) {
    let max = arr[0]
    for (let i = 0; i <= arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i]
        }
    }
    return max
}
let result = getArrMax([5, 26, 14, 3, 89, 74, 15])
console.log(result);//89

//return 终止函数
function add(num1, num2) {
    //函数体
    return num1 + num2;  // 注意: return后的代码不执行alert(·我不会被执行，因为前面有return);
    let resNum = add(21, 6);//调用函数，传入两个实参，并通过resNum接收函数返回值
    alert(resNum); // 27
}

function add2(num1, num2) {
    //函数体
    return num1, num2;
}
console.log(add2(23, 1)); // 1

function getResult(n1, n2) {
    return [n1 + n2, n1 * n2, n1 - n2, n1 / n2]
}
console.log(getResult(25, 62));//[ 87, 1550, -37, 0.4032258064516129 ]

//arguments参数的使用 只有函数才有arguments对象﹐而且是每个函数都内置好了这个arguments
function fn() {
    console.log(arguments);//里面存储了所有传递的实际参数
    console.log(arguments.length);//3
    console.log(arguments[1]);//2
    //可以按照数组的方式遍历arguments
    /* 
    1
    2
    3
    */
    for (let i = 0; i < arguments.length; i++) {
        console.log(arguments[i]);
    }
}
fn(1, 2, 3)//[Arguments] { '0': 1, '1': 2, '2': 3 }

//伪数组
/*
1.具有数组的长度
2.按照索引的方式来处理
3.它没有正真数组的一些方法 pop() push()
*/

//利用函数的arguments参数求任意个数的最大值
function getMaxarg() {
    let max = arguments[0]
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] > max) {
            max = arguments[i]
        }
    }
    return max
}
console.log(getMaxarg(1, 2, 5, 36, 45, 12));//45
console.log(getMaxarg(1, 32, 35, 346, 45, 12));//346
console.log(getMaxarg(1, 2, 35, 36, 545, 142));//545

//利用函数翻转任意数组reverse翻转
function reverse(arr) {
    let newArr = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        newArr[newArr.length] = arr[i];
    }
    return newArr;
}
let arr1 = reverse([1, 3, 4, 6, 9]);
console.log(arr1);//[ 9, 6, 4, 3, 1 ]

//利用函数冒泡排序sort排序
function sort(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}
let arr2 = sort([1, 4, 2, 9]);
console.log(arr2);//[ 1, 2, 4, 9 ]

//利用函数判断闰年
function isLeapYear(year) {
    //如果闰年返回true否则返回false
    let flag = false
    if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
        flag = true
    }
    return flag
}
console.log(isLeapYear(2000));//true

/* 
函数可以调用另外一个函数
因为每个函数都是独立的代码块，用于完成特殊任务，因此经常会用到函数相互调用的情况。
*/
function fn1() {
    console.log('fn1调用了');
    fn2()//在fn1函数调研函数fn2
}
function fn2() {
    console.log('fn2调用了');
}
fn1()
/* 
fn1调用了
fn2调用了
*/
function backDay(year) {
    let result = isLeapYear(year)
    return result ? '这一年是闰年2月有29天' : '这一年是平年2月有28天'
}
console.log(backDay(2036));//这一年是闰年2月有29天