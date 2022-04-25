//1.if的语法结构
/* if(条件表达式){
    //执行语句
} */
//2.执行思路 如果if里面的条件表达式结果为真 则执行大括号里面的执行语句
//如果if条件表达式结果为假 则不执行大括号里面的语句 执行if语句后面的代码
if (3 > 5) {//false
    console.log('沙漠骆驼');
}
if (3 < 5) {//true
    console.log('沙漠骆驼');
}

//if else 语句（双分支语句）
/* if(条件表达式){
    //执行语句1
} else {
    //执行语句2
} */
// 执行思路 如果表达式结果为真 那么执行语句1 否则执行语句2
/* let age = prompt('请输入你的年龄')
if (age > 18) {
    alert('可以')
} else {
    alert('不可以')
} */
//最终只有一个语句执行 2选1

function leapYear(year) {
    if (year % 400 === 0) {
        console.log(year + '是闰年');
    } else if (year % 4 === 0 && year % 100 !== 0) {
        console.log(year + '是闰年');
    } else {
        console.log(year + '不是闰年');
    }
}

leapYear(2000)
leapYear(2001)

/* if(条件一){
    //语句1
} else if(条件二) {
    //语句二
} else {
    //最后的语句
} */
let score = 60
if(score > 90){
    console.log('优秀');
} else if(score > 80) {
    console.log('良好');
} else {
    console.log('一般');
}

let num = 10
let result = num > 5 ? '是的' : '不是'
console.log(result);

/* switch (key) {
    case value:
        
        break;

    default:
        break;
} */
switch (1) {
    case 1:
        console.log(1);
        break;

    default:
        console.log('不匹配');
        break;
}