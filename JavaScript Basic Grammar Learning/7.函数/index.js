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