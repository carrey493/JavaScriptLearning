//元字符 最小单位字符，表示一类字符中的最小一个
let hd = 'houdunren 2010'
console.log(hd.match(/\d/));//2
console.log(hd.match(/\d\d\d/));//201

console.log(hd.match(/\d/g));// 2 0 1 0

console.log(hd.match(/\d+/g));// 2010

let str1 ='张三：010-9999799,李四：020-8875888'
console.log(str1.match(/\d{3}-\d{7,8}/g));//[ '010-9999799', '020-8875888' ]

// /D 匹配除了数字
let str2 = 'asdhj2014  dwa'
console.log(str2.match(/\D+/));//asdhj

let str3 ='张三：010-9999799,李四：020-8875888'
console.log(str3.match(/[-\d：,]/g));
//
/* [
    '：', '0',  '1', '0', '-', '9',
    '9',  '9',  '9', '7', '9', '9',
    ',',  '：', '0', '2', '0', '-',
    '8',  '8',  '7', '5', '8', '8',
    '8'
  ] */

//[^]除了匹配到的剩下都要
console.log(str3.match(/[^-\d：,]+/g));//[ '张三', '李四' ]

//空白 \s  包含空格 换行符
console.log(/\s/.test('hd'));//false
console.log(/\s/.test(' hd'));//true
console.log(/\s/.test('\nhd'));//true

// \S 除了空白
console.log(/\S/.test(' hd'));//true



