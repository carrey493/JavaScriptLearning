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
console.log(getRandom(1, 10));//9
