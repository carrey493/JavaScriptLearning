//1.运算符导读
//2.算数运算符
//2.1
console.log(1 + 1);//2
console.log(1 - 1);//0
console.log(1 * 1);//1
console.log(1 / 1);//1
console.log(5 % 3);//2
//2.2浮点数算数运算符有问题 所以∶不要直接判断两个浮点数是否相等!
console.log(0.1 + 0.2);//0.3000000000000000000004
console.log(0.07 * 100);//7.00000000000001
var number221 = 0.1 + 0.2
console.log(number221 === 0.3);//false
//2.3它的余数是0就说明这个数能被整除，这就是%取余运算符的主要用途

//2.4表达式和返回值
console.log(1 + 1);
//把右边的表达式计算完毕把返回值给左边

//3.递增和递减运算符
//3.1递增和递减运算符概述
//前置递增运算符 ++写在变量前面
let age = 10
console.log(++age);
console.log(++age + 10);
//先+1后返回值

//后置递增运算符
let num = 11
console.log(num++);