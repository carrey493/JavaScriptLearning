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

//4比较运算符
//4.1比较运算符概述
console.log(3 >= 5);//false
console.log(3 >= 2);//true
// == 默认转换数据类型 会把字符串转换为数字型
console.log(18 == 18);//true
console.log(18 == '18');//true
console.log(18 != 18);//false
//全等 ===
console.log(18 === '18');//false

//5.逻辑运算符
//5.1逻辑运算符概述
//1.逻辑与 &
//两个都为true结果才为true 只要有一个为假结果为false
console.log(3 > 5 && 3 > 2);//false
console.log(3 < 5 && 3 > 2);//true
//2.逻辑或 |
//两个都为false结果才为false 只要有一个为真结果为trye
console.log(3 > 5 || 3 > 2);//true
console.log(3 > 5 || 3 < 2);//false
//3.逻辑非 not |
console.log(!true);//false
var logicNum = 7
var logicStr = 'loveyou'
console.log(logicNum > 5 && logicStr.length >= 5);//true
console.log(logicNum < 5 && logicStr.length >= 5);//false
console.log(!(logicNum < 10));//false
console.log(!(logicNum < 10 || logicStr.length == logicNum))//false;//true
//5.5短路运算（逻辑中断）
//逻辑与
//如果第一个表达式的值为真，则返回表达式2如果第一个表达式的值为假，则返回表达式1
console.log(123 && 456);//456
console.log(0 && 456);//0 
console.log(0 && 1 + 2 && 456);//0
//如果有空的话或者否定的为假其余为真 0 '' null undefined NaN

//逻辑或
//如果第一个表达式的值为真，则返回表达式1如果第一个表达式的值为假，则返回表达式2
console.log(123 || 456);//123
console.log(123 || 456 + 987);//123
console.log(0 || 456);//456
console.log(0 || 456 || 789);//456

var logicNum2 = 0
console.log(123 || logicNum2++);//123
console.log(logicNum2); 0

//6.赋值运算符
var age6 = 6
age6 += 7
console.log(age6);

//7.运算符优先级
console.log(4 >= 6 || '人' != '阿凡达' && !(12 * 2 == 144) && true);//true
var num7 = 10
console.log(5 == num7 / 2 && (2 + 2 * num7).toString() === '22');//true
