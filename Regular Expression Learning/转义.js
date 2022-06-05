let price1 = '23854.@$5'
//. 除换行外任何字符
console.log(/\d+.\d/.test(price1));//true

//普通字符点.
let price2 = '23854.5'

console.log(/\d+\.\d/.test(price2));//true

let price3 = '12.23'
console.log('\d+\.\d+');//d+.d+
let reg = new RegExp('\d+\.\d+');//d+.d+
console.log(reg.test(price3));//false

let reg2 = new RegExp('\\d+\\.\\d+');//
console.log(reg.test(price3));//false

let url = 'https:www.houdunren.com'
console.log(/https?:\/\/\w+\.\w+\.\w+/.test(url));
