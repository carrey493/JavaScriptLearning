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
