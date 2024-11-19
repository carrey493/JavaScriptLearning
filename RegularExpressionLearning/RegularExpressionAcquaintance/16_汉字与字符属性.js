// 任何字符都有相应的属性区分

let hd = "houdunren2010.加油!";

// 检测字符的属性有没有L属性 L属性代表这是一个字母
console.log(hd.match(/\p{L}/g)); // null 无效

console.log(hd.match(/\p{L}/gu)); // ['h', 'o', 'u','d', 'u', 'n','r', 'e', 'n']

// 匹配标点符号
console.log(hd.match(/\p{P}/gu)); // [ '.', '!' ]

// 语言系统
// Script sc

// 匹配中文
console.log(hd.match(/\p{sc=Han}/gu)); // [ '加', '油' ]

// 宽字节使用 u 匹配
