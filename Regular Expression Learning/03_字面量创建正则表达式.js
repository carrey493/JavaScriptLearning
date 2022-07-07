let ex = 'exexex.com'
console.log(/e/.test(ex));//true

let a = 'e'
console.log(/a/.test(ex));//false
//不能识别变量

console.log(eval(`/${a}/`).test(ex));//true
//eval 把字符串变为js表达式